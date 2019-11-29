const express = require('express');
const containerRouter = express.Router();
const DockerService = require('./../../Services/Docker.service');

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
    // Convert the body to DTO
    const containers = await DockerService.getAllContainers();

    return response.json({ containers });
  });

containerRouter.get('/info/:containerId',
  async (request, response, next) => {


  });

module.exports = containerRouter;