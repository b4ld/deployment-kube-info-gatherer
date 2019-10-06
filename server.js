//Server
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = express()
const portt = 4499

// app.use(express.json());
// app.use(express.urlencoded())
app.set('view engine', 'pug');
// app.use(express.static("public_index")); 
app.listen(portt, () => console.log('App listening on portt ' + portt))

//https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
var ipv4public = "";
var ipv4local = "";
var amiid = "";
var localhostname = "";
var publichostname = "";
var awsregion = "";
var workername = "";
var haveCredentials = false;

var URL = "http://169.254.169.254/latest/meta-data/"


app.get('/', function (req, res) {

  // Requests for specific Kubernetes
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
    credentials = body;
    haveCredentials = credentials.includes("SecretAccessKey")
  });
  
  console.log(haveCredentials)
  
  var jsonResponse = {
    
    title: "INFO-POD-DATA",
    homedir: os.homedir(),
    hostname: os.hostname(),
    platform: os.platform(),
    freememory: Math.round(os.freemem() / 1000000),
    totalmemory: Math.round(os.totalmem() / 1000000),
    release: os.release(),
    ipv4kubelocal: ipv4local,
    ipv4kubepublic: ipv4public,
    amiidkube: amiid,
    localhostnamekube: localhostname,
    publichostnamekube: publichostname,
    awsregionkube: awsregion,
    kubeCreds: haveCredentials
  }
  
  fs.writeFile('Downloads/pod-info.json', JSON.stringify(jsonResponse), (err) => {
    if (err) throw err;
    console.log('File Saved!');
  });
  
  res.render('indexone', jsonResponse);
});



app.get('/download', function (req, res) {
  const file = `Downloads/pod-info.json`;
  res.download(file); // Set disposition and send it.
});