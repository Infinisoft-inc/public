
const express = require('express');

class MockAPI {
  constructor({ port, responseCallback }) {
    this.port = port || 3000;
    this.responseCallback = responseCallback || (() => 'Thank you');
    this.app = express();

    // Middleware to parse JSON request body
    this.app.use(express.json());

    // Route to receive any POST request and use the response callback
    this.app.post('*', (req, res) => {
      const response = this.responseCallback(req.body);
      res.send(response);
    });
  }

  start() {
    // Start the server on the specified port
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// Create an instance of the MockAPI class with default options
const mockAPI = new MockAPI({});

// Start the server
mockAPI.start();
