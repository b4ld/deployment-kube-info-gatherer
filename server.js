/**
 * Imports modules
 */
const loaders = require('./loaders');
const express = require('express');


async function startServer() {
  const SERVER_PORT = process.env.SERVER_PORT || 4499;
  const CURRENT_ENVIRONMENT = process.env.CURRENT_ENVIRONMENT;
  const app = express();

  await loaders({ expressApp: app });

  app.listen(SERVER_PORT, err => {
    if(err) {
      console.log("Server error - " + err);
      return;
    }
    console.log("------------------------------------------")
    console.log('App is listening on port: ' + SERVER_PORT);
    console.log("Working on Environment: " + CURRENT_ENVIRONMENT);
    console.log("------------------------------------------");
  });

}

startServer();