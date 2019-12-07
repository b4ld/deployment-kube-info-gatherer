const express = require('express');
const containerRouter = express.Router();
const CloudService = require('./../../Services/Cloud.service');
const MetadataService = require('./../../Services/Metadata.service');

/**
 * Get All docker container
 * 
 * @param {Object http} request 
 * @param {Object http} response 
 * @param {function} next  
 */
containerRouter.get('/metadata',
  async (request, response, next) => {
    const provider = await CloudService.getCloudProvider();
    const metadata = await MetadataService.getMetadata(provider);
    return response.json({ metadata })
  });


module.exports = containerRouter;