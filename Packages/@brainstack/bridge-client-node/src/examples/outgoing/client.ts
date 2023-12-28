// client.ts
import { BridgeClientNode } from '../..'; // Update with the correct path
import { createLogger, Logger } from '@brainstack/log';
import { createEventHub, EventHub } from '@brainstack/hub';

const logger: Logger = createLogger(5);
const hub: EventHub = createEventHub();
const client = new BridgeClientNode({ logger, hub });

// client.connect();
// 
setTimeout(() => {
  hub.emit('macro.dts.rawdata.outgoing', 'Hello WebSocket Server!');
}, 3000);

hub.on('micro.websocket.rawdata.incoming', (message: string) => {
  console.log('Message from server:', message);
});
