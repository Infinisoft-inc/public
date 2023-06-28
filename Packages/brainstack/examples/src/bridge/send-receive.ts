import { createEventHub } from '@brainstack/hub';
import { createLogger } from '@brainstack/log';
import {createBridgeClient, createBridgeServer} from "@brainstack/bridge"

const start_server = () =>{
  const server = createBridgeServer({});
}

// Create an event hub
const eventHub = createEventHub({
  source: 'unknown',
  logger: createLogger(3),
});

// Subscribe to an event
const unsubscribe = eventHub.on(/.*/, (payload:any) => {
  // Handle the event
  console.log('Event received:', payload);
});

// Emit an event
eventHub.emit('button.click', { message: 'Hello, world!' });

// Unsubscribe from the event
unsubscribe();