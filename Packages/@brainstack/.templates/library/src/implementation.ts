import { createLogger } from '@brainstack/log';
import { config } from 'dotenv';
config();

const log = createLogger(5);

if (!process.env['KEY']) {
  log.error(`Unable to load key`);
}

export {};
