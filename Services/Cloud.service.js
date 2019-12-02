const axios = require("axios");
const configsCloud = require("./../config/serverConfigs").serverConfigurations;

class CloudService {

  constructor() {
    this.httpClient = axios.create();
    this.httpClient.defaults.timeout = 3000;
  }

  async getCloudProvider() {

    let promiseArray = []

    configsCloud.forEach(element => {
      console.log(element.url)
      promiseArray.push(this.httpClient.get(element.info.mainURL).catch(err => console.log(err.code)))
    });

    const resultData = await axios.all(promiseArray)

    for (let index = 0; index < resultData.length; index++) {
      if (resultData[index]) {
        let vendorCloudConfig = configsCloud.filter(obj => (obj.info.mainURL == resultData[index].config.url))
        return vendorCloudConfig[0].info.provider
      }
    }
    return "NO_ACCESS_TO_METADATA_API"
  }
}

module.exports = new CloudService();