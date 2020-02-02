const express = require('express');
const containerRouter = express.Router();
const CloudService = require('./../../Services/Cloud.service');
const MetadataService = require('./../../Services/Metadata.service');
const CredentialService = require("./../../Services/Credential.service")


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
    return response.json(metadata)
  });
  
  containerRouter.get('/checkprovider',
  async (request, response, next) => {
    const provider = await CloudService.getCloudProvider();
    console.log(provider+"---Provider")
    // return response.json(provider)
    return response.json({provider})
  });

containerRouter.get('/credentials',
  async (request, response, next) => {
    const provider = await CloudService.getCloudProvider();
    const credentialExposure = await CredentialService.checkCredentialExposure(provider);

    return response.json(credentialExposure)
  });
module.exports = containerRouter;