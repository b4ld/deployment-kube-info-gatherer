const express = require('express');
const request = require('request');
const router = express.Router();
const Util = require('./util');
const os = require('os');
const si = require('systeminformation');

/**
 * 
 * 
 */
router.get('/', (req, res) => {
  //Arrays to promise.all
  let promiseArrayMetadata = []
  let promiseArrayDockerSi = []

  //SET Environment using ENV to choose on module ServerConfigs
  let serverType = process.env.NODE_ENV
  let filterServer = ServerConfigs.filter((serverInfo) => serverInfo.info.name === serverType);
  let server = filterServer[0];
  let serverRoutes = Object.keys(server.subpath)

  //metadata Api Promises fill the array by serverConfigs
  for (let startRoute = 0; startRoute < serverRoutes.length; startRoute++) {
    var prom = new Promise(function (resolve, reject) {
      request(server.info.mainURL + server.subpath[serverRoutes[startRoute]], { json: true, timeout: 3000 }, (err, res, body) => {
        if (err) {
          reject("NOT OK")
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

  let healthCheck = new Promise(function (resolve, reject) {
    request(server.info.mainURL, { json: true, timeout: 2000 }, (err, res, body) => {
      if (err) {
        reject(err + "ERR")
      }
      resolve(res + "RES")
    })
  }).catch(() => { console.log("ERROR on PROMISSE HC") })

  //Make and return Promisses API and Docker
  function fetchAllmetadataAPI() {
    return Promise.all(promiseArrayMetadata).then(function (values) {
      return values
    }).catch(() => { console.log("ERROR on PROMISSE") })
  }
  function fetchAllDockerData() {
    return Promise.all(promiseArrayDockerSi).then(function (values) {
      return values
    }).catch(() => { console.log("ERROR on PROMISSE") })
  }
  //Health Check to API url.
  function healthCheckTrigger() {
    return healthCheck.then(function (value) {
      return value
    })
  }

  async function myAsyncFunction() {
    let allDataToDisplay = {}
    let arrayOfPromissesNames = ["Cpu", "DockerContainer", "DockerAllContainers"] //REFACTOR - Make it Dynamic

    //Prommises calls 
    let healthRes = await healthCheckTrigger()
    let dockerRes = await fetchAllDockerData();
    let metaRes = []

    
    
    //Setting Up Metadata api
    if (healthRes == undefined) {
      metaRes = ["N/D", "N/D", "N/D", "N/D", "N/D", "N/D", "N/D", "N/D", "N/D"] //REFACTOR THIS (Like this o bypass the reduce)
    } else {
      let metaRes = await fetchAllmetadataAPI();
      let jointArray = Util.mergeArrays(serverRoutes, metaRes)
      let dataFromMetaApi = {
        "name": "metadataapi",
        "subinfo": jointArray,
      }
      allDataToDisplay.metaApi = dataFromMetaApi
    }

    //Setting Up Docker data 
    let lastWithAll = Util.toObject(dockerRes, arrayOfPromissesNames);
    allDataToDisplay.Cpu = lastWithAll.Cpu
    allDataToDisplay.DockerContainer = lastWithAll.DockerContainer
    allDataToDisplay.DockerAllContainers = lastWithAll.DockerAllContainers


    //Setting Up.....(New Infos to add)


    return allDataToDisplay
  }


  myAsyncFunction().then(function (values) {
    createMainJsonToFrontend(values)
  })



  function createMainJsonToFrontend(valuesRaw) {

    console.log(valuesRaw)



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
      // manufactureri: values.manufacturer,
      // brandi: values.brand,
      // speedi: values.speed,
      // speedmini: values.speedmin,
      // speedmaxi: values.speedmax,
      // coresi: values.cores,
      // physicalcoresi: values.physicalCores,
      // socketi: values.socket,
      //Docker
      // containersd: values.containers,
      // containersrund: values.containersRunning,
      // containersstopd: values.containersStopped,
      // imagesd: values.images,
      // pperatingsystemd: values.pperatingSystem,
      // productlicensed: values.productLicense,
      // ostyped: values.osType,
      // httpproxyd: values.httpProxy,
      // httpsproxyd: values.httpsProxy,
      // dockerrootdird: values.dockerRootDir,
      //DOckerAllArray
      // dockerallarraydname: listOfContinersNames,

    }

    writeToFile(mainJsonResponse)
    renderWithAll(mainJsonResponse)


  }


  //Promises ----------

  function renderWithAll(mainJsonResponse) {
    res.render('indexone', mainJsonResponse);
  }
});

/**
 * 
 * 
 */
router.get('/download', (req, res) => {
  const file = `Downloads/pod-info.json`;
  res.download(file); // Set disposition and send it.
});

module.exports = router;