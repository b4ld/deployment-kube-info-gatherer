const systemInformation = require('systeminformation');


class DockerService {

  async getAllContainers() {
    const allContainers = await systemInformation.dockerAll();

    console.log(allContainers);

    return { containers: allContainers };
  }

  async getInformation(container) {

  }

}

module.exports = new DockerService();