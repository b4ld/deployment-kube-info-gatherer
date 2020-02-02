const express = require('express');
const containerRouter = express.Router();
const DockerService = require('./../../Services/Docker.service');
const SystemService = require('./../../Services/System.service');

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
    return response.json(containers);
  });

containerRouter.get('/systeminfo',
  async (request, response, next) => {
    const systemInfo = await SystemService.getSystemInfo();
    return response.json(systemInfo.cpuInfo);
  });


module.exports = containerRouter;