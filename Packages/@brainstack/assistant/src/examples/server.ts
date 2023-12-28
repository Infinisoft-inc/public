import { createLogger } from '@brainstack/log';
import { ASSistant } from '..';
import { createEventHub } from '@brainstack/hub';

const log = createLogger(5);
const hub = createEventHub();

const run = () => {
  const martin = new ASSistant()
  martin.listen("127.0.0.1", 7777);
  
  // martin.hub.on(/\.*/, console.log);
  // martin.hub.emit('john', { name: 'john' });

}

run();
