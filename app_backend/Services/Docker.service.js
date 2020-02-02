const systemInformation = require('systeminformation');


class DockerService {

  async getAllContainers() {
    const allContainers = await systemInformation.dockerAll();
    return allContainers;
  }

}

module.exports = new DockerService();