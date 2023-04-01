const express = require("express");
const http = require("http");
const { Action } = require("..");
const { Assistant } = require("..");
const { Logger } = require("..");
const { Skill } = require("..");
const { Task } = require("..");

// Define an action to start an Express server for serving SPA
class ServeSPAAction extends Action {
  constructor() {
    super();
  }

  async execute() {
    const app = express();
    // Serve static files from the public folder
    app.use(express.static("public"));
    // Serve index.html as the entry point for SPA
    app.get("*", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    // Create an HTTP server
    const server = http.createServer(app);
    // Start the server on port 80
    server.listen(8080, () => {
      console.log("SPA server started on port 8080");
    });

    return "Server started";
  }
}

// Create an action instance
const serveSPAAction = new ServeSPAAction();

// Create a task with the action
const serveSPATask = new Task([serveSPAAction]);

// Create a skill with the task
const apiSkill = new Skill([serveSPATask]);

// Create an assistant with the skill
const assistant = new Assistant([apiSkill]);

// Create a logger instance
const logger = new Logger(5); // Log level set to 5 (debug)

// Apply the assistant's skills
(async () => {
  try {
    const results = await assistant.applySkills(null, logger);
    console.log("Results:", results);
  } catch (error) {
    console.error("Error:", error);
  }
})();
