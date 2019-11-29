class Container {
  constructor(params) {
    this._containerId = params.containerId;
    this._dockerImage = params.dockerImage;
    this._command = params.command;
    this._created = params.created;
    this._ports = params.ports;
    this._name = params.name;
  }

}




module.exports = Container;