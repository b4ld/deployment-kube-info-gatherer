// import React from 'react';
import React, { Component } from 'react';

import Contacts from './components/contacts';
import Metadata from './components/metadata';
import Label from "./components/Label";



import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));





class App extends Component {

  state = {
    provider: [],
    metadata: [],
  }

  componentDidMount() {
    // Get Metadata From Provider
    fetch('http://localhost:4499/metadata')
      .then(res => res.json())
      .then((data) => {
        this.setState({ metadata: data })
      })
      .catch(console.log)
    //Check Provider
    fetch('http://localhost:4499/checkprovider')
      .then(res => res.json().catch(console.log("ERROR TO JSON")))
      .then((data) => {
        this.setState({ provider: data })
      })
      .catch(console.log)


  }

  render() {
    return (
      <>
        <Label provider={this.state.provider} />
        <table id="metatable-out">
          <th id="metatable-out-th">Metadata Api Call</th>
          <tr>
            <Metadata metadata={this.state.metadata} />
          </tr>
        </table>
      </>
    );
  }
}




export default App;
