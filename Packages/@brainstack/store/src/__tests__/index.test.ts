import { createStore } from '..'; // Replace with actual import path

describe('createStore', () => {
  it('should create a microstore instance with state and event handling', () => {
    const initialState = { value: 42 };
    const initializer = initialState;
    const eventHubOptions = {
      /* Your event hub options here */
    };

    const microstore = createStore({
      initializer,
      eventHubOptions,
    });

    // Ensure state and hub instances were created
    expect(microstore).toHaveProperty('getState');
    expect(microstore).toHaveProperty('mutate');
    expect(microstore).toHaveProperty('on');
    expect(microstore).toHaveProperty('emit');
    expect(microstore).toHaveProperty('subscribe');

    // Test the initializer function
    expect(microstore.getState()).toBe(initialState);

    // Test subscription and state change
    const callback = jest.fn();
    const unsubscribe = microstore.subscribe(callback);
    microstore.mutate((currentState) => {
      return { ...currentState, value: 99 };
    });

    // Ensure callback was called on state change
    expect(callback).toHaveBeenCalledTimes(1);

    // Test unsubscribe
    unsubscribe();
    microstore.mutate((currentState) => {
      return { ...currentState, value: 123 };
    });

    // Ensure callback was not called after unsubscribing
    expect(callback).toHaveBeenCalledTimes(1);
  });

  // Additional test cases for different scenarios can be added here
});
