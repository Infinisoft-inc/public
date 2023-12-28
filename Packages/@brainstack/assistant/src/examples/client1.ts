import { createLogger } from '@brainstack/log';
import { createEventHub } from '@brainstack/hub';
import { ASSistant } from '..';

const log = createLogger(5);
const hub = createEventHub();

const run = () => {
  const laurie = new ASSistant();

  // laurie.connect('ws://127.0.0.1:');
  setInterval(()=> {
  // laurie.hub.emit('data.outgoing', { name: 'JOJDHDHDGDHGF' });
 1 },5000);

};

run();
