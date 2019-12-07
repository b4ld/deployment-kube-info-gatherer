const axios = require("axios");
const util = require("util")
const configsCloud = require("./../config/serverConfigs").serverConfigurations;

const utilitiesArrays = require("./../util/ArraysUtil");

const CircularJSON = require('circular-json');


class CloudService {

  constructor() {
    this.httpClient = axios.create();
    this.httpClient.defaults.timeout = 3000;
  }

  async getMetadata(provider) {

    provider = "default" //---------------------
    if (provider === "NO_ACCESS") {
      console.log(provider)
      return provider
    }

    let promiseArray = []
    let dataFromArray = []

    const mainProvider = configsCloud.filter((prov) => prov.info.provider === provider)
    const selectedProvider = mainProvider[0]

    const subPathKeys = Object.keys(selectedProvider.subpath)

    for (let index = 0; index < subPathKeys.length; index++) {
      const element = subPathKeys[index];

      console.log(" -- Sub-Path -- " + selectedProvider.info.mainURL + selectedProvider.subpath[element])
      promiseArray.push(
        this.httpClient.get(selectedProvider.info.mainURL + selectedProvider.subpath[element]).catch(err => console.log(err.code))
      )
    }

    const resultData = await axios.all(promiseArray)

    let dataParsed = JSON.parse(CircularJSON.stringify(resultData))
    dataParsed.forEach(element => {
      dataFromArray.push(element.data)
    });

    let dataRefined = utilitiesArrays.mergeArrays(subPathKeys, dataFromArray)

    return dataRefined

  }
}

function mergeArr(columns, rows) {
  var result = rows.reduce(function (result, field, index) {
    result[columns[index]] = field;
    return result;
  }, {})
  return result
}


module.exports = new CloudService();