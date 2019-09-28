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


app.get('/', function (req, res) {
  res.render('indexone', 
  { 
    title: "title", 
    homedir: os.homedir(),
    hostname: os.hostname(), 
    platform: os.platform(),
    freememory: os.freemem(), 
    totalmemory: os.totalmem(),
    release: os.release(), 
});
});



app.get('/download', function(req, res){
  const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
  res.download(file); // Set disposition and send it.
});