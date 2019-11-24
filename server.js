//Server Modules
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser');
const os = require('os');
const fs = require('fs');
const si = require('systeminformation');
const path = require('path');
// const config = require('config');
const app = express()
const ServerConfigs = require('./config/serverConfigs').serverConfigurations;

//Environment Variables && config Variables Set
const currentEnvironment = process.env.NODE_ENV
const portt = 4499
// const configName = config.get("ENV.info.name")
// const mainURL = config.get("ENV.info.mainURL")

//Utils
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//Configs
app.set('view engine', 'pug');


console.log("------------------------------------------")
app.listen(portt, () => console.log('App is listening on port: ' + portt))
console.log("Working on Enviroment: " + currentEnvironment)
console.log("------------------------------------------")




//https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
// var URL = "http://169.254.169.254/latest/meta-data/"

const allRequests = []; // in use

// var ipv4public = "";
// var ipv4local = "";
// var amiid = "";
// var localhostname = "";
// var publichostname = "";
// var awsregion = "";
// var workername = "";
// var haveCredentials = false;


// var apiReachablility = true



app.get('/', function (req, res) {





  //OBJECTS TO DISPLAY
  let dataFromMetaApi = {}
  let dataFromDockerSi = {}

  let allDataToDisplay = {}

  //Arrays to promise.all
  let promiseArrayMetadata = []
  let promiseArrayDockerSi = []


  //SET Environment using ENV to choose on module ServerConfigs
  let serverType = process.env.NODE_ENV
  let filterServer = ServerConfigs.filter((serverInfo) => serverInfo.info.name === serverType);
  let server = filterServer[0];
  let serverRoutes = Object.keys(server.subpath)

  // let Options = {
  //   uri: server.info.mainURL,
  //   timeout: 3000,
  //   json: true
  // }

  //metadata Api Promises fill the array by serverConfigs
  for (let startRoute = 0; startRoute < serverRoutes.length; startRoute++) {
    var prom = new Promise(function (resolve, reject) {
      request(server.info.mainURL + server.subpath[serverRoutes[startRoute]], { json: true, timeout: 3000 }, (err, res, body) => {
        if (err) {
          return console.log(err + " ERROR MESSSAGE ");
        }
        resolve(body)
      })
    })
    promiseArrayMetadata.push(prom)
  }


  //PROMISSES
  let promCpu = new Promise(function (resolve, reject) {
    resolve(si.cpu())
    reject(() => { console.log("ERROR on PROMISSE _ REJECTION of promCpu") })
  }).catch(() => { console.log("ERROR on PROMISSE") })
  promiseArrayDockerSi.push(promCpu)

  let promDocker = new Promise(function (resolve, reject) {
    resolve(si.dockerInfo())
    reject(() => { console.log("ERROR on PROMISSE _ REJECTION of promDocker") })
  }).catch(() => { console.log("ERROR on PROMISSE") })
  promiseArrayDockerSi.push(promDocker)

  let promDockerContainerAll = new Promise(function (resolve, reject) {
    resolve(si.dockerAll())
    reject(() => { console.log("ERROR on PROMISSE _ REJECTION of promDocekrContaineAll") })
  }).catch(() => { console.log("ERROR on PROMISSE") })
  promiseArrayDockerSi.push(promDockerContainerAll)

  let arrayOfData = []

  //Make and return Promisses API and Docker
  // function fetchAllmetadataAPI() {
  //   return Promise.all(promiseArrayMetadata).then(function (values) {
  //     return values
  //   }).catch(() => { console.log("ERROR on PROMISSE") })
  // }

  function fetchAllDockerData() {
    return Promise.all(promiseArrayDockerSi).then(function (values) {
      arrayOfData.push(values)
      return values
    }).catch(() => { console.log("ERROR on PROMISSE") })
  }

  // fetchAllmetadataAPI().then(function (val) {
  //   console.log("VALL LAFTER META")
  //   let jointArray = mergeArrays(serverRoutes, val)

  //   dataFromMetaApi = {
  //     "name": "metadataapi",
  //     "subinfo": jointArray,
  //   }

  //   allDataToDisplay.metaApi = dataFromMetaApi

  //   console.log(allDataToDisplay)
  //   console.log("VALL LAFTER META")
  // })
  fetchAllDockerData().then(function (val) {
    console.log("VALL LAFTER DOCKER")
    let arrayOfPromissesNames = ["Cpu", "DockerContainer", "DockerAllContainers"]
    let lastWithAll = toObject(val,arrayOfPromissesNames)

    allDataToDisplay.Cpu = lastWithAll.Cpu
    allDataToDisplay.DockerContainer = lastWithAll.DockerContainer
    allDataToDisplay.DockerAllContainers = lastWithAll.DockerAllContainers
    
    console.log("_________________")
    console.log(allDataToDisplay)
    console.log("_________________")
    console.log("VALL LAFTER DOCKER")
  })
  
  

  
  
  
  function createMainJsonToFrontend(valuesRaw) {
    
    // console.log(" fgggggggggggggggggggggggggggggggg")
    // console.log(valuesRaw)
    // console.log(" fgggggggggggggggggggggggggggggggg")
    
    
    
    // let valuesDAll = valuesRaw[2]
    // let values = arrayToObj(valuesRaw)
    // console.log(valuesDAll)
    // let listOfContinersNames = listDockerContainersNames(valuesDAll)
    
    
    
    
    var mainJsonResponse = {
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
      // ipv4kubelocal: values.ipv4local,
      // ipv4kubepublic: ipv4public,
      // ipv4kubelocal: values.ipv4local,
      // ipv4kubepublic: ipv4public,
      // amiidkube: amiid,
      // localhostnamekube: localhostname,
      // publichostnamekube: publichostname,
      // awsregionkube: awsregion,
      // haveKubeCreds: haveCredentials,
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
      ostyped: values.osType,
      httpproxyd: values.httpProxy,
      httpsproxyd: values.httpsProxy,
      dockerrootdird: values.dockerRootDir,
      //DOckerAllArray
      dockerallarraydname: listOfContinersNames,
      
    }
    
    writeToFile(mainJsonResponse)
    renderWithAll()
    
    
  }
  
  
  //Promises ----------
  
  function renderWithAll(mainJsonResponse) {
    res.render('indexone', mainJsonResponse);
  }
});



//UTILS FUNCTIONS------------------- 
function toObject(arr,arrNames) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[arrNames[i]] = arr[i];
  return rv;
}

function mergeArrays(columns, rows) {
  var result = rows.reduce(function (result, field, index) {
    result[columns[index]] = field;
    return result;
  }, {})
  return result
}

function arrayToObj(values) {
  var finalObject = values.reduce((obj, item) => Object.assign(obj, item), {});
  return finalObject
}


function listDockerContainersNames(valuesDockerAll) {
  //Array parameter
  let resolveIntonameid = valuesDockerAll.reduce(function (s, a) {
    s[a.name] = a.id;
    return s;
  }, {});
  
  var arrayOfNames = Object.keys(resolveIntonameid);
  return arrayOfNames
}



function writeToFile(jsonResponse) {
  fs.writeFile('Downloads/pod-info.json', JSON.stringify(jsonResponse), (err) => {
    if (err) throw err;
    console.log('File Saved at! ' + new Date);
  });
}





app.get('/download', function (req, res) {
  const file = `Downloads/pod-info.json`;
  res.download(file); // Set disposition and send it.
});