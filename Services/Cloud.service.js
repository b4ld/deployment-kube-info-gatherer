const axios = require("axios");

class CloudService {

  constructor() {
    this.httpClient = axios.create();
    this.httpClient.defaults.timeout = 3000;

  }

  async getCloudProvider() {

    const allRequests = []

    //Configs files 
    let arr = [{
      "url": "https://api.ghub.com",
      "provider": "aws"
    },
    {
      "url": "https://api.thub.com/users",
      "provider": "azure"
    }]


    let novoArr = []

    arr.forEach(element => {
      console.log(element.url)
      novoArr.push(this.httpClient.get(element.url).catch(err => console.log(err.code)))

    });

    const allBatatas = await axios.all(
      // [
      novoArr
      // this.httpClient.get("https://api.github.com/users").catch(err => console.log(err.code + " AWS") ),
      // // this.httpClient.get("http://169.254.169.254/latest/meta-data/latest").catch(err => console.log(err.code + " AWS")),
      // this.httpClient.get("http://169.254.169.254/latest/meta-data/").catch(err => console.log(err.code + " AZURE") ),
      // this.httpClient.get("http://metadata.google.internal/").catch(err => console.log(err.code  + " GOOGLE") ),
      // this.httpClient.get("http://rancher-metadata/").catch(err => console.log(err.code + " RANCH") ),
      // this.httpClient.get("http://169.254.169.254/metadata/v1/hostname").catch(err => console.log(err.code + " DIGITALOCEAN") ),
      // this.httpClient.get("http://169.254.169.254/openstack/").catch(err => console.log(err.code + " OPENSTACK") )
      // ]
    )

    for (let index = 0; index < allBatatas.length; index++) {
      if (allBatatas[index]) {
        let rss = arr.filter(obj => (obj.url == allBatatas[index].config.url))
        return rss[0].provider
      }
    }

    return "secure metadata"
  }

}

module.exports = new CloudService();