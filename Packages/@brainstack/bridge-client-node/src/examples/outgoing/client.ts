// client.ts
import { BridgeClient } from '../..'; // Update with the correct path
import { createLogger, Logger } from '@brainstack/log';
import { createEventHub, EventHub } from '@brainstack/hub';

const logger: Logger = createLogger(5);
const hub: EventHub = createEventHub();
const client: BridgeClient = new BridgeClient({ logger, hub });

client.connect('ws://localhost:8888');

setTimeout(() => {
  hub.emit('macro.dts.rawdata.outgoing', 'Hello WebSocket Server!');
}, 3000);

hub.on('micro.websocket.rawdata.incoming', (message: string) => {
  console.log('Message from server:', message);
});
