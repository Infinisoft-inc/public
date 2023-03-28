const iBrainHub = require('./iBrainHub');

describe('iBrainHub', () => {
  let event;

  beforeEach(() => {
    event = new iBrainHub();
  });

  test('should add and remove listeners', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    event.on('event1', listener1);
    event.on('event1', listener2);

    expect(event.listeners.event1).toHaveLength(2);

    event.off('event1', listener1);

    expect(event.listeners.event1).toEqual([]);

    expect(event.listeners.event1[0]).toBe(listener2);

    event.off('event1', listener2);

    expect(event.listeners.event1).toBeUndefined();
  });

  test('should emit events', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    event.on('event1', listener1);
    event.on('event2', listener2);

    event.emit('event1', 'arg1', 'arg2');

    expect(listener1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(listener2).not.toHaveBeenCalled();

    event.emit('event2', 'arg3');

    expect(event.listeners.event1).toEqual([]);

    expect(listener2).toHaveBeenCalledWith('arg3');
  });

  test('should do nothing if no listeners for an event', () => {
    expect(() => event.emit('event1')).not.toThrow();
    expect(() => event.off('event1', jest.fn())).not.toThrow();
  });
});
