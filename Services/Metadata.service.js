const axios = require("axios");
const configsCloud = require("./../config/serverConfigs").serverConfigurations;
const utilitiesArrays = require("./../util/ArraysUtil");
const CircularJSON = require('circular-json');


class CloudService {

  async getMetadata(provider) {

    provider = "default" // ------------------

    const mainProvider = configsCloud.filter((prov) => prov.info.provider === provider)
    const selectedProvider = mainProvider[0]
    const subPathKeys = Object.keys(selectedProvider.subpath)

    //---------------------AWS---------------------
    async function getMetadataFromAws() {

      let promiseArray = []
      let dataFromArray = []

      for (let index = 0; index < subPathKeys.length; index++) {
        const element = subPathKeys[index];
        console.log(" -- Sub-Path -- " + selectedProvider.info.mainURL + selectedProvider.subpath[element])
        promiseArray.push(
          axios.get(selectedProvider.info.mainURL + selectedProvider.subpath[element]).catch(err => console.log(err.code))
        )
      }

      let resultData = await axios.all(promiseArray)
      let dataParsed = JSON.parse(CircularJSON.stringify(resultData))

      dataParsed.forEach(element => {
        console.log(element)
        if (element) { dataFromArray.push(element.data); }
      });

      let dataRefined = utilitiesArrays.mergeArrays(subPathKeys, dataFromArray)

      return dataRefined
    }
    //----------------------------------------------

    switch (provider) {
      case "aws":
        return getMetadataFromAws()
      case "default":
        return getMetadataFromAws()
      default:
        return false
    }








  }






}

module.exports = new CloudService();