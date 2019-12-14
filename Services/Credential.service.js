const axios = require("axios");
const configsCloud = require("./../config/serverConfigs").serverConfigurations;
const CircularJSON = require('circular-json');
const utilitiesArrays = require("./../util/ArraysUtil");

class CloudService {

  async checkCredentialExposure(provider) {
    console.log(provider)
    provider = "default" //-----------------

    let dataFromArray = []
    const mainProvider = configsCloud.filter((prov) => prov.info.provider === provider)
    const selectedProvider = mainProvider[0]
    const subPathKeys = Object.keys(selectedProvider.subpath)

    //_-----------------AWS
    async function getCredentialsAws() {
      try {
        let response = await axios.get(selectedProvider.info.mainURL + selectedProvider.subpath.workername).catch(err => console.log(err.code));
        let creds = await axios.get(selectedProvider.info.mainURL + selectedProvider.subpath.workername + response.data).catch(err => console.log(err.code));
        // creds = 1
        
        //See if contains a key
        if (creds) {
          return true
        }
        return false;
      } catch (error) {
        console.error(error);
        return false
      }
    }
    //_-----------------
    
    
    
    return getCredentialsAws()
    
  }
}

module.exports = new CloudService();
