//Server
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser');
const os = require('os');
const fs = require('fs');
const si = require('systeminformation');
const path = require('path');

const app = express()
const portt = 4499

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// app.use(express.json());
// app.use(express.urlencoded())
app.set('view engine', 'pug');
// app.use(express.static("public_index")); 
app.listen(portt, () => console.log('App listening on portt ' + portt))

//https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
var URL = "http://169.254.169.254/latest/meta-data/"

var ipv4public = "";
var ipv4local = "";
var amiid = "";
var localhostname = "";
var publichostname = "";
var awsregion = "";
var workername = "";
var haveCredentials = false;

var healthCheckOptions = {
  url: 'http://169.254.169.254',
  timeout: 2000
}


app.get('/', function (req, res) {

  request(healthCheckOptions, function (err, resp, body) {
    if (err) {
      return console.log(err + "-> API is not reachable");
    } else {
      // Requests for specific cloud
      request(URL + 'public-ipv4', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        ipv4public = body;
      });
      request(URL + 'local-ipv4', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        ipv4local = body;
      });
      request(URL + 'ami-id', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        amiid = body;
      });
      request(URL + 'local-hostname', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        localhostname = body;
      });
      request(URL + 'public-hostname', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        publichostname = body;
      });
      request(URL + 'placement/availability-zone', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        awsregion = body;
      });

      //sec cred + role name
      request(URL + 'iam/security-credentials', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        workername = body;
      });
      request(URL + 'iam/security-credentials/' + workername, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        try {
          credentials = body;
          console.log(haveCredentials + " - Before")
          haveCredentials = (credentials.SecretAccessKey != "")
          console.log(haveCredentials + " - After")
        }
        catch (error) {
          console.log(error)
          haveCredentials = false
        }
      });
    }
  });


  function createJsonAndRender(values) {


  console.log(values)

    var jsonResponse = {
      //OSNode
      title: "INFO-POD-DATA",
      timestamp: new Date,
      homedir: os.homedir(),
      hostname: os.hostname(),
      platform: os.platform(),
      freememory: Math.round(os.freemem() / 1000000),
      totalmemory: Math.round(os.totalmem() / 1000000),
      release: os.release(),
      //Metadata Service
      ipv4kubelocal: values.ipv4local,
      ipv4kubepublic: ipv4public,
      amiidkube: amiid,
      localhostnamekube: localhostname,
      publichostnamekube: publichostname,
      awsregionkube: awsregion,
      haveKubeCreds: haveCredentials,
      //SystemInfo
      manufactureri: values.manufacturer,
      brandi: values.brand,
      speedi: values.speed,
      speedmini: values.speedmin,
      speedmaxi: values.speedmax,
      coresi: values.cores,
      physicalcoresi: values.physicalCores,
      socketi: values.socket,
      //Docker
      containersd: values.containers,
      containersrund: values.containersRunning,
      containersstopd: values.containersStopped,
      imagesd: values.images,
      pperatingsystemd: values.pperatingSystem,
      productlicensed: values.productLicense,
      ostyped:values.osType,
      httpproxyd:values.httpProxy,
      httpsproxyd:values.httpsProxy,
      dockerrootdird:values.dockerRootDir,
      // containersd:["qwe","rw","qwrwrt"]
      // containersdd:values //Pass this to array




    }

    writeToFile(jsonResponse)
    res.render('indexone', jsonResponse);
    //   console.log('CPU Information:');
  }



  //Promises ----------
  var promCpu = new Promise(function (resolve, reject) {
    resolve(si.cpu())
  })
  var promDocker = new Promise(function (resolve, reject) {
    resolve(si.dockerInfo())
  })


  //NEW
  var promDockerContainerStats = new Promise(function (resolve, reject) {
    resolve(si.dockerContainerStats())
  })
  var promDockerContainerProcesses = new Promise(function (resolve, reject) {
    resolve(si.dockerContainerProcesses())
  })



  //This must be passed from diferent prommiss to e used as ARRAY
  var promDockerContainerAll = new Promise(function (resolve, reject) {
    resolve(si.dockerAll())
  })

  //Promises ----------
  Promise.all([
    promCpu, 
    promDocker,
    // promDockerContainerProcesses, 
    // promDockerContainerStats
  ]).then(function (values) {
    // console.log(values)
    createJsonAndRender(arrayToObj(values))
    // createJsonAndRender(values)
  })


  function arrayToObj(values) {
    var finalObject = values.reduce((obj, item) => Object.assign(obj, item), {});
    return finalObject
  }



  function writeToFile(jsonResponse) {
    fs.writeFile('Downloads/pod-info.json', JSON.stringify(jsonResponse), (err) => {
      if (err) throw err;
      console.log('File Saved at! ' + new Date);
    });
  }



});



app.get('/download', function (req, res) {
  const file = `Downloads/pod-info.json`;
  res.download(file); // Set disposition and send it.
});