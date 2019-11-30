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
    const systemInfo = await SystemService.getSystemInfo();


    return response.json({ containers, systemInfo });
  });

containerRouter.get('/infoaws',
  async (request, response, next) => {
      const resp = await CloudService.getCloudProvider();
      return response.json({resp})
  });

module.exports = containerRouter;