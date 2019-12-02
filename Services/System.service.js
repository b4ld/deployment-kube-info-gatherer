const systemInformation = require('systeminformation');


class SystemService {

  async getSystemInfo() {
    const cpuInfo = await systemInformation.cpu();
    const userSessions = await systemInformation.users();
    return { cpuInfo , userSessions };
  }

}

module.exports = new SystemService();