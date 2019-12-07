const express = require('express');
const containerRouter = express.Router();
const DockerService = require('./../../Services/Docker.service');
const SystemService = require('./../../Services/System.service');
const CloudService = require('./../../Services/Cloud.service');

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


module.exports = containerRouter;