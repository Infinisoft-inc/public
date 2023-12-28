// Modified client.ts
import { BridgeClient } from '../..'; // Adjust the import path
import { createLogger } from '@brainstack/log';
import { createEventHub } from '@brainstack/hub';

const logger = createLogger();
const hub = createEventHub();
const client = new BridgeClient({ logger, hub });

client.connect('ws://localhost:8888');

// Send a message to the server
setTimeout(() => {
  hub.emit('macro.dts.rawdata.outgoing', 'Hello Reverse Server!');
}, 3000);

// Handle response from the server
hub.on('micro.websocket.rawdata.incoming', (message: string) => {
  console.log('Response from server:', message);
});
