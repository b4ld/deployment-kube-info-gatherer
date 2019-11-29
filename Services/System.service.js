const systemInformation = require('systeminformation');


class SystemService {

  async getSystemInfo() {
    const cpuInfo = await systemInformation.cpu();
    const cpuTemperature = await systemInformation.cpuTemperature();

    return { cpuInfo, cpuTemperature };
  }

}

module.exports = new SystemService();