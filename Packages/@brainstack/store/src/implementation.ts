import { createEventHub } from '@brainstack/hub';
import { createState } from '@brainstack/state';
import { TStoreFactory } from '.';

/**
 * Creates a microstore instance with integrated state management and event handling.
 *
 * @param {TCreateStoreOptions} [options] - Optional options for creating the microstore.
 * @param {Function} options.initializer - A function that initializes the initial state.
 * @param {Array} [options.eventHubOptions] - Options for configuring the event hub.
 *
 * @returns {Object & State & EventHub} A microstore instance with state management and event handling.
 */
export const createStore:TStoreFactory = (options) => {

  /** @type {State} */
  const state = createState(options?.initializer);

  /** @type {EventHub} */
  const hub = createEventHub(options?.eventHubOptions);

  /**
   * Subscribes to changes in the microstore state and returns the current state.
   *
   * @param {Function} callback - The callback function to be called when the state changes.
   * @returns {Function} A function that can be called to unsubscribe from the state changes.
   */
  const subscribe = (
    callback: (_state: ReturnType<typeof state.getState>) => void
  ) => {
    return hub.on('state.changed', () => callback(state.getState()));
  };

  /**
   * Updates the microstore state with a new value and emits a "state.changed" event.
   *
   * @param {Function} mutator - A function that receives the current state and returns the updated state.
   */
  const mutate = (
    mutator: (_state: ReturnType<typeof state.getState>) => any
  ) => {
    state.mutate(mutator);
    hub.emit('state.changed', state.getState());
  };

  /**
   * Returns an object containing the current microstore state, the `getState`, `on`, and `emit` functions from the microstore instance,
   * and the `mutate` function for updating the state.
   *
   * @type {Object & State & EventHub} An object containing the current microstore state and related functions.
   */
  return {
    ...state,
    mutate,
    ...hub,
    subscribe,
  };
};
