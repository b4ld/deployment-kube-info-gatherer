import React, { Component } from 'react';

import Metadata from './components/metadata';
import Sys from "./components/System";
import ProviderLabel from "./components/ProviderLabel";
import DockerContainers from "./components/DockerContainers";
import DockerContainersState from "./components/DockerContainersState";
import DockerContainersImage from "./components/DockerContainersImage";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// PRODUCTION
let BACKEND_API_URL = "kube-infog-service-api:4499"

// DEVELOPMENT
// let BACKEND_API_URL = "localhost:4499"

class App extends Component {

  state = {
    vendor: [],
    sys: [],
    metadata: [],
    containers: [],
  }

  componentDidMount() {
    // Get Metadata From Provider
    fetch('http://'+BACKEND_API_URL+'/metadata')
      .then(res => res.json())
      .then((data) => {
        this.setState({ metadata: data })
      })
      .catch(console.log)
    //Check Provider
    fetch('http://'+BACKEND_API_URL+'/checkprovider')
      .then(res => res.json().catch(console.log("ERROR TO JSON")))
      .then((data) => {
        this.setState({ vendor: data })
      })
      .catch(console.log)
    //System info
    fetch('http://'+BACKEND_API_URL+'/systeminfo')
      .then(res => res.json().catch(console.log("ERROR TO JSON")))
      .then((data) => {
        this.setState({ sys: data })
      })
      .catch(console.log)
    //Containers info
    fetch('http://'+BACKEND_API_URL+'/containers')
      .then(res => res.json().catch(console.log("ERROR TO JSON")))
      .then((data) => {
        this.setState({ containers: data })
      })
      .catch(console.log)


  }

  render() {
    return (
      <>
        <Container>

          <Row id="headerprovider">
            <Col>
              <ProviderLabel vendor={this.state.vendor} />
            </Col>
          </Row>
          <Row id="headerrow">
          </Row>
          <Row id="bodyrow-01">
          </Row>
          <Row id="bodyrow-02">
            <Col>
              <table id="table-out">
                <th id="table-out-th">Metadata Api Call</th>
                <tr>
                  <Metadata metadata={this.state.metadata} />
                </tr>
              </table>
            </Col>
            <Col>
              <table id="table-out">
                <th id="table-out-th">System Info</th>
                <tr>
                  <Sys sys={this.state.sys} />
                </tr>
              </table>
            </Col>
          </Row>
          <Row id="bodyrow-03">
            <Col>
              <table id="table-out">
                <th id="table-out-th">Docker Containers Name</th>
                <tr>
                  <DockerContainers containers={this.state.containers} />
                </tr>
              </table>
            </Col>
            <Col>
              <table id="table-out">
                <th id="table-out-th">Docker Containers State</th>
                <tr>
                  <DockerContainersState containers={this.state.containers} />
                </tr>
              </table>
            </Col>
            <Col>
              <table id="table-out">
                <th id="table-out-th">Docker Containers Image</th>
                <tr>
                  <DockerContainersImage containers={this.state.containers} />
                </tr>
              </table>
            </Col>
          </Row>
          <Row id="bodyrow-04">
          </Row>
        </Container>
      </>
    )
  }
}

export default App;
