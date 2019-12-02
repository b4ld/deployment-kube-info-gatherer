const axios = require("axios");
const configsCloud = require("./../config/serverConfigs").serverConfigurations;

class CloudService {

  async getMetadata() {


    return "MetaFData"
  }
}

module.exports = new CloudService();