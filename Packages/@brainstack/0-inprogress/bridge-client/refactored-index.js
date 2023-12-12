const WebSocket = require('ws');
const { Hub } = require('@brainstack/hub');

const hub = new Hub();
const websocketUrl = 'ws://127.0.0.1:10001';
const ws = new WebSocket(websocketUrl);

ws.on('open', function open() {
  console.log('Connected to the WebSocket server.');
  hub.on('.*', (data) => ws.send(JSON.stringify(data)));
});

ws.on('message', function incoming(data) {
  const message = JSON.parse(data);
  hub.emit(message.event, message.data);
});

ws.on('close', function close() {
  console.log('Disconnected from the WebSocket server.');
  // Reconnect logic can be implemented here
});

ws.on('error', function error(err) {
  console.error('WebSocket encountered an error:', err);
});
