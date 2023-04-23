const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const {iBrainMicroStore} = require('@brainstack/microstore');
const StoreConnector  = require('./store-connector'); // Import StoreConnector class

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Create an instance of MicroStore
const backEndStore = iBrainMicroStore();

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Create a StoreConnector instance for each connection
  const backEndConnector = new StoreConnector(backEndStore, ws);

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
