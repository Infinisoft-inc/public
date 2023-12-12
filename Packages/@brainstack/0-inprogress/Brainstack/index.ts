import { createLogger, createState,LogLevel} from "@brainstack/core";
import { createEventHub } from '@brainstack/hub'

const hub = createEventHub()
const log = createLogger(LogLevel.VERBOSE);
const store = createState({});

export const coreServices = {
  store,
  log,
  hub
};
export type TBstackCore = typeof coreServices