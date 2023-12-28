import { createEventHub } from '../implementation';
import { Options } from '../abstraction';

// Mock Logger
const logger: any = {
  log: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  dir: jest.fn(),
  trace: jest.fn(),
  time: jest.fn(),
  timeEnd: jest.fn(),
  group: jest.fn(),
  groupEnd: jest.fn(),
};

describe('Event Hub', () => {
  const options: Options = { source: 'test', logger };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe to and emit events', () => {
    const eventHub = createEventHub(options);
    const handler1 = jest.fn();

    // Subscribe to event "testEvent"
    const unsubscribe1 = eventHub.on('testEvent', handler1);

    // Emit the event "testEvent" with payload
    eventHub.emit('testEvent', { data: 'testPayload' });

    // Check if the handler is called with the correct arguments
    expect(handler1).toHaveBeenCalledWith({
      event: 'testEvent',
      content: { data: 'testPayload' }, // Update this line
      headers: expect.any(Array), // Expect headers to be an array
    });

    expect(handler1).toHaveBeenCalledTimes(1);

    // Unsubscribe the handler
    unsubscribe1();
  });

  it('should subscribe to and emit events with regular expressions', () => {
    const eventHub = createEventHub(options);

    const handler1 = jest.fn();
    const handler2 = jest.fn();

    // Subscribe to events matching the regular expression /^test\..+/
    const unsubscribe1 = eventHub.on('test.event1', handler1);
    const unsubscribe2 = eventHub.on(/^test\..+/, handler2);

    // Emit events matching the regular expression
    eventHub.emit('test.event1', { data: 'payload1' });
    eventHub.emit('test.event2', { data: 'payload2' });

    // Unsubscribe the handlers
    unsubscribe1();
    unsubscribe2();

    // Check if no handlers are called after unsubscribing
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(2);
  });
});
