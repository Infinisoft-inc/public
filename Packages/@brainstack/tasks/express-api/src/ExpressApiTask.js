const { Task } = require("@brainstack/framework");
const express = require("express");

class ExpressApiTask extends Task {
  constructor(logger) {
    super();
    this.app = express();
    this.server = null;
    this.logger = logger;
  }

  async run(input) {
    const { port, configureRoutes } = input;

    // Configure the routes using the provided function
    configureRoutes(this.app);

    // Start the Express server
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(port, () => {
        this.logger.log(`Express API server listening on port ${port}`);
        resolve({ success: true });
      }).on("error", (err) => {
        this.logger.error(`Error: ${err.message}`);
        reject(err);
      });
    });
  }

  // Method to stop the server (optional)
  async stop() {
    if (this.server) {
      return new Promise((resolve) => {
        this.server.close(() => {
          this.logger.log("Express API server stopped");
          resolve({ success: true });
        });
      });
    }
  }
}

module.exports = ExpressApiTask;
