#!/bin/bash

echo 'Creating required files...'

echo "const EventEmitter = require('events');" > store.js
echo "class Store extends EventEmitter { constructor() { super(); } }" >> store.js
echo "module.exports = Store;" >> store.js

echo "const WebSocket = require('ws');" > websocket.js
echo "const ws = new WebSocket('ws://localhost:8080');" >> websocket.js
echo "module.exports = ws;" >> websocket.js

echo "const Store = require('./store');" > index.js
echo "const ws = require('./websocket');" >> index.js
echo "const Microbridge = require('./microbridge');" >> index.js
echo "const store = new Store();" >> index.js
echo "const microbridge = new Microbridge(store, ws, { reconnectDelayInMs: 5000, logger: console.log });" >> index.js
echo "store.on('example.event', (payload) => console.log('Received:', payload));" >> index.js
echo "setTimeout(() => store.emit('example.event', { message: 'Hello, World!' }), 2000);" >> index.js

echo 'Installing required packages...'
npm init -y
npm install ws events

echo 'Running the example...'
node index.js

echo 'Cleaning up...'
rm store.js websocket.js index.js package.json package-lock.json
rm -rf node_modules
