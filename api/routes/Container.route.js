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
    const systemInfo = await SystemService.getSystemInfo();


    return response.json({ containers, systemInfo });
  });

containerRouter.get('/info/:containerId',
  async (request, response, next) => {


  });

module.exports = containerRouter;