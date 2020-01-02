const systemInformation = require('systeminformation');


class SystemService {

  async getSystemInfo() {
    const cpuInfo = await systemInformation.cpu();
    delete cpuInfo.cache
    return { cpuInfo };
  }

}

module.exports = new SystemService();