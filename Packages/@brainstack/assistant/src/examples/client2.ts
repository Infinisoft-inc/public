import { createLogger } from '@brainstack/log';
import { ASSistant } from '../..';
import { createEventHub } from '@brainstack/hub';

const log = createLogger(5);
const hub = createEventHub();

const run = () => {
  const laurie = new ASSistant();


  laurie.connect("127.0.0.1", 7777)
  
};

run();
