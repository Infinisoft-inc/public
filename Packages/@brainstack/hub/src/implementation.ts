import { createLogger,Logger } from "@brainstack/log";
import { uuidv1 } from './utils'; // Ensure uuidv1 is correctly imported

export interface EventHub {
  on: (event: string | RegExp, handler: Function) => () => void;
  emit: (event: string, content?: any) => void;
  uuid: string;
}

export interface Options {
  source?: string;
  logger?: Logger;
}

export type EventHubFactory = (options?: Options) => EventHub;

export interface EventHeader {
  uuid: string;
  timestamp: number;
}

export interface EventPayload {
  event: string;
  content: any;
  headers: EventHeader[];
}

export const createEventHub: EventHubFactory = (
  options = { source: 'unknown', logger: createLogger(3) }
) => {
  const events = new Map<string, Map<string, Function>>();
  const regexHandlers = new Map<RegExp, Map<string, Function>>();
  const uuid = uuidv1(); // UUID for this EventHub instance

  const on = (event: string | RegExp, handler: Function): (() => void) => {
    const handlerId = uuidv1();
    let handlers: Map<string, Function>;

    if (typeof event === 'string') {
      handlers = events.get(event) ?? new Map();
      handlers.set(handlerId, handler);
      events.set(event, handlers);
    } else if (event instanceof RegExp) {
      handlers = regexHandlers.get(event) ?? new Map();
      handlers.set(handlerId, handler);
      regexHandlers.set(event, handlers);
    } else {
      throw new Error('Invalid event name');
    }

    return () => handlers.delete(handlerId);
  };

  function emit(event: string, content: any = {}): void {
    const eventData: EventPayload = {
      event,
      content,
      headers: [
        {
          uuid,
          timestamp: new Date().getTime(),
        },
      ],
    };

    events.get(event)?.forEach(handler => handler(eventData));

    regexHandlers.forEach((handlers, regex) => {
      if (regex.test(event)) {
        handlers.forEach(handler => handler(eventData));
      }
    });
  }

  return { on, emit, uuid };
};
