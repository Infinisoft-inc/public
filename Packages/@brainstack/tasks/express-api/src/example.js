const ExpressApiTask = require("./ExpressApiTask");
const LoggerTask = require("./LoggerTask");
const configureRoutes = require("./apiRoutes");

// Create an instance of the LoggerTask
const logger = new LoggerTask();

// Create an instance of the ExpressApiTask, passing in the logger
const expressApiTask = new ExpressApiTask(logger);

// Input for the ExpressApiTask (port number and route configuration function)
const apiInput = {
  port: 3000,
  configureRoutes
};

// Start the Express API server
expressApiTask.run(apiInput)
  .then((output) => {
    logger.log("Express API server started successfully");
  })
  .catch((error) => {
    logger.error(`Error: ${error.message}`);
  });

// Optionally, to stop the server, call the stop method
// expressApiTask.stop();