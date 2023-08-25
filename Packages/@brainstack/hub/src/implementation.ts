import {  EventHubFactory } from './abstraction';
import {createLogger} from '@brainstack/log'
import { uuidv1 } from './utils';

/**
 * Creates an event hub with the provided options.
 * @param options - The options for the event hub.
 * @returns The created event hub.
 */
export const createEventHub: EventHubFactory = (options={source:"unknown", logger: createLogger(3)}) => {
  const events = new Map<string, Map<string, Function>>();
  const regexHandlers = new Map<RegExp, Map<string, Function>>();
  const uuid = uuidv1();

  /**
   * Subscribes to an event in the hub.
   * @param event - The name of the event to subscribe to (string or regular expression).
   * @param handler - The callback function to be executed when the event is emitted.
   * @returns A function to remove the handler from the subscribed event.
   */
  const on = (event: string | RegExp, handler: Function) => {
    const handlerId = uuidv1();
    let handlers: Map<string, Function>;

    if (typeof event === "string") {
      handlers = events.get(event) ?? new Map();
      handlers.set(handlerId, handler);
      events.set(event, handlers);
    } else if (event instanceof RegExp) {
      handlers = regexHandlers.get(event) ?? new Map();
      handlers.set(handlerId, handler);
      regexHandlers.set(event, handlers);
    } else {
      throw new Error("Invalid event name");
    }

    return () => {
      handlers.delete(handlerId);
    };
  };

  /**
   * Emits an event in the hub, triggering subscribed handlers.
   * @param event - The name of the event to emit.
   * @param payload - The payload data to be passed to subscribed handlers.
   */
  function emit(event: string, payload: any = {}): void {
    // Exit early to prevent event duplication
    if (String(JSON.stringify(payload?.headers)).includes(uuid)) return;

    const handlers = events.get(event);

    if (handlers) {
      for (let handler of handlers.values()) {
        handler({ event, ...payload });
      }
    }

    // Check for matching handlers for a regular expression
    for (let regex of regexHandlers.keys()) {
      if (regex.test(event)) {
        for (let handler of regexHandlers.get(regex)?.values() ?? []) {
          const headers = payload?.headers || [];
          headers.push({ uuid, timestamp: new Date().getTime() });
          const updatedPayload = { ...payload, headers };
          handler({ event, ...updatedPayload });
        }
      }
    }
  }

  return { on, emit, uuid };
};
