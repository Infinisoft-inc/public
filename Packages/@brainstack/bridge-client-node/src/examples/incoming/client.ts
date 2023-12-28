// Modified client.ts
import { BridgeClientNode } from '../..'; // Adjust the import path
import { createLogger } from '@brainstack/log';
import { createEventHub } from '@brainstack/hub';

const logger = createLogger();
const hub = createEventHub();
const client = new BridgeClientNode({ logger, hub });

// client.connect();

// Send a message to the server
setTimeout(() => {
  hub.emit('macro.dts.rawdata.outgoing', 'Hello Reverse Server!');
}, 3000);

// Handle response from the server
hub.on('micro.websocket.rawdata.incoming', (message: string) => {
  console.log('Response from server:', message);
});
