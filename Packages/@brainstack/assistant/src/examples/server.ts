import { createLogger } from '@brainstack/log';
import { Assistant } from '..';
import { createEventHub } from '@brainstack/hub';

const log = createLogger(5);
const hub = createEventHub();

const run = () => {
  const martin = new Assistant(
    hub, log
  )
  martin.listen();
  
  // martin.hub.on(/\.*/, console.log);
  // martin.hub.emit('john', { name: 'john' });

}

run();
