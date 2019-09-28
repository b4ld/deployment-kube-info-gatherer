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


var ipv4 = "";
var info = "";

app.get('/', function (req, res) {
  
  // Requests for specific Kubernetes
  request('http://169.254.169.254/latest/meta-data/public-ipv4', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    ipv4 = body;
  });

  res.render('indexone', 
  { 
    title: "title", 
    homedir: os.homedir(),
    hostname: os.hostname(), 
    platform: os.platform(),
    freememory: Math.round(os.freemem()/1000000), 
    totalmemory: Math.round(os.totalmem()/10000000),
    release: os.release(), 
    ipv4kube: ipv4,

});
});



app.get('/download', function(req, res){
  const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
  res.download(file); // Set disposition and send it.
});