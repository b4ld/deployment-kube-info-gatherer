const expressLoader = require('./express');


/**
 * All dependence for app are load in here
 * example: Redis, mongo, tasks
 */
const loader = async({ expressApp }) => {

  /**
   * Init express
   */
  await expressLoader({ app: expressApp });
  console.log("Express Initialized");

};


module.exports = loader; 