#!/usr/bin/env node
const express = require("express");
const cors = require("cors");
const fs = require("fs");

class MockAPI {
  constructor({ port, responseCallback, responseFilePath }) {
    this.port = port || 3000;
    this.responseCallback = responseCallback || (() => {
      // Read the content of the response file
      const fileContent = fs.readFileSync(responseFilePath, 'utf8');
      return fileContent;
    });
    this.app = express();

    this.app.use(cors());

    // Middleware to parse JSON request body
    this.app.use(express.json());

    // Route to receive any POST request and use the response callback
    this.app.post("*", (req, res) => {
      const response = this.responseCallback(req.body);
      res.send(response);
    });
  }

  start() {
    // Start the server on the specified port
    this.app.listen(this.port, () => {
      console.log(`
      
      
                                                                                                                               
  ,ad88PPP88ba,   88                                   88                                                           88         
  d8"  .ama.a "8a  88                                   ""                            ,d                             88         
 d8'  ,8P"88"  88  88                                                                 88                             88         
 88  .8P  8P   88  88,dPPYba,   8b,dPPYba,  ,adPPYYba,  88  8b,dPPYba,   ,adPPYba,  MM88MMM  ,adPPYYba,   ,adPPYba,  88   ,d8   
 88  88   8'   8P  88P'    "8a  88P'   "Y8  ""     'Y8  88  88P'   '"8a  I8[    ""    88     ""     'Y8  a8"     ""  88 ,a8"    
 88  8B ,d8 ,ad8'  88       d8  88          ,adPPPPP88  88  88       88   '"Y8ba,     88     ,adPPPPP88  8b          8888[      
 "8a "88P"888P"    88b,   ,a8"  88          88,    ,88  88  88       88  aa    ]8I    88,    88,    ,88  "8a,   ,aa  88'"Yba,   
  'Y8aaaaaaaad8P   8Y"Ybbd8"'   88          '"8bbdP"Y8  88  88       88  '"YbbdP"'    "Y888  '"8bbdP"Y8   '"Ybbd8"'  88   'Y8a  
     """""""""                                                                                                                  
                                                                                                                              
       Mock API
      
      Server is running on port ${this.port}`);
    });
  }
}

// Create an instance of the MockAPI class with options including responseFilePath
const mockAPI = new MockAPI({ responseFilePath: 'response' });

// Start the server
mockAPI.start();