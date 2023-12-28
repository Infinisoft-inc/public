// main.ts
import { createLogger } from '@brainstack/log';
import { DataTransformationService } from '..';
import { createEventHub } from '@brainstack/hub';
import { BridgeClient } from '@brainstack/bridge-client-node';

// Setup Logger
const logger = createLogger(5);

// Setup EventHub
const hub = createEventHub();

// Initialize DataTransformationService
const dts = new DataTransformationService(hub, logger);

// Initialize BridgeClient
const client = new BridgeClient({ logger, hub });
client.connect('ws://localhost:8888');

setTimeout(() => {
  // Example of sending a message
  console.log(`Emiting`)
  hub.emit('outgoing', { type: 'message', content: 'Hello World' });
}, 5000);

// Handling incoming data
hub.on('micro.websocket.rawdata.incoming', (rawData: any) => {
  console.log('Received raw data:', rawData);
});

// Handle deserialized data
hub.on('data.deserialized', (data: any) => {
  console.log('Deserialized data:', data);
});
