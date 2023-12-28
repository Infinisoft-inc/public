import { createLogger } from '@brainstack/log';
import { Assistant } from '..';
import { createEventHub } from '@brainstack/hub';

const log = createLogger(5);
const hub = createEventHub();

const run = () => {
  const laurie = new Assistant(hub, log);

  laurie.connect('ws://127.0.0.1:7777');
  setInterval(()=> {
  laurie.hub.emit('data.outgoing', { name: 'JOJDHDHDGDHGF' });
  },5000);
  
};

run();
