/**
 * Imports modules
 */
const express = require('express');
const routes = require('./router');



/**
 * Environment variables 
 */
const CURRENT_ENVIRONMENT = process.env.NODE_ENV;
const SERVER_PORT = 4499;


const app = express();

/**
 * Server Configuration
 */
app.disable('x-powered-by');


/**
 * View definition 
 */
app.set('view engine', 'pug');

/**
 * Make the app use Routes defined
 */
app.use(routes);



app.listen(SERVER_PORT, () => {
  console.log("------------------------------------------")
  console.log('App is listening on port: ' + SERVER_PORT);
  console.log("Working on Environment: " + CURRENT_ENVIRONMENT);
  console.log("------------------------------------------");
});

