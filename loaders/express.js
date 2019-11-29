const bodyParser = require('body-parser');
const cors = require('cors');

const containerRouter = require('./../api/routes/Container.route');

/**
 * Definition of express and all middlewares
 * example: routes, cors, modules, express settings
 */
const expressLoader = async ({ app }) => {
  app.get('/', (req, res) => res.send('Hello is Ok, we are on') );
  app.use(containerRouter);


  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  return app;
};

module.exports = expressLoader;