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
var hostnamekube = "";

app.get('/', function (req, res) {

  // Requests for specific Kubernetes
  request('http://169.254.169.254/latest/meta-data/public-ipv4', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    ipv4public = body;
  });
  request('http://169.254.169.254/latest/meta-data/local-ipv4', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    ipv4local = body;
  });
  request('http://169.254.169.254/latest/meta-data/ami-id', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    amiid = body;
  });
  request('http://169.254.169.254/latest/meta-data/local-hostname', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    localhostname = body;
  });
  request('http://169.254.169.254/latest/meta-data/public-hostname', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    publichostname = body;
  });
  request('http://169.254.169.254/latest/meta-data/hostname', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    hostnamekube = body;
  });

  res.render('indexone',
    {
      title: "title",
      homedir: os.homedir(),
      hostname: os.hostname(),
      platform: os.platform(),
      freememory: Math.round(os.freemem() / 1000000),
      totalmemory: Math.round(os.totalmem() / 10000000),
      release: os.release(),
      ipv4kubelocal: ipv4local,
      ipv4kubepublic: ipv4public,
      amiidkube: amiid,
      localhostnamekube: localhostname,
      publichostnamekube: publichostname,
      hostnamek: hostnamekube,

    });
});



app.get('/download', function (req, res) {
  const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
  res.download(file); // Set disposition and send it.
});