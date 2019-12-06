const express = require('express');
const containerRouter = express.Router();
const DockerService = require('./../../Services/Docker.service');
const SystemService = require('./../../Services/System.service');
const CloudService = require('./../../Services/Cloud.service');
const MetadataService = require('./../../Services/Metadata.service');

const CircularJSON = require('circular-json');

/**
 * Get All docker container
 * 
 * @param {Object http} request 
 * @param {Object http} response 
 * @param {function} next  
 */
containerRouter.get('/containers',
  // middlewares go here
  async (request, response, next) => {
    const containers = await DockerService.getAllContainers();
    console.log(containers)
    return response.json({ containers });
  });

containerRouter.get('/checkprovider',
  async (request, response, next) => {
    const provider = await CloudService.getCloudProvider();
    return response.json({ provider })
  });

containerRouter.get('/systeminfo',
  async (request, response, next) => {
    const systemInfo = await SystemService.getSystemInfo();
    return response.json({ systemInfo });
  });

containerRouter.get('/metadata',
  async (request, response, next) => {
    const provider = await CloudService.getCloudProvider();
    const metadata = await MetadataService.getMetadata(provider);
    
    let dataParsed = JSON.parse(CircularJSON.stringify(metadata))

    const dataFromArray = []

    dataParsed.forEach(element => {
        dataFromArray.push(element.data)
    });
    // return response.json(JSON.parse(str)[0].data)
    return response.json({dataFromArray})
  });

module.exports = containerRouter;