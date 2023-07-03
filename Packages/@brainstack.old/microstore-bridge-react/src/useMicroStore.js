/**
 * This module exports functions for creating and using a custom hook for a microstore instance.
 * @module useMicroStore
 */

import React from "react";
import { iBrainMicroStore } from "@brainstack/microstore";

/**
 * Creates a custom hook for accessing a microstore instance.
 * @param {Object} _store - The microstore instance to be used by the hook.
 * @returns {Function} A function that can be used as a custom hook for accessing the microstore.
 */
export const createUseMicroStore = (_store) => () => {

  /**
   * Subscribes to changes in the microstore state and returns the current state.
   * @param {Function} callback - The callback function to be called when the state changes.
   * @returns {Function} A function that can be called to unsubscribe from the state changes.
   */
  const subscribe = (callback) => {
    return _store.on("state.changed", () => callback(state));
  };

  /**
   * Synchronizes the local state with the microstore state and returns the current state.
   * @type {Object} The current state of the microstore.
   */
  const state = React.useSyncExternalStore(subscribe, store.getState);

  /**
   * Updates the microstore state with a new value and emits a "state.changed" event.
   * @param {any} val - The new value to be set as the microstore state.
   */
  const mutate = (val) => {
    _store.mutate(val);
    _store.emit("state.changed", val);
  };

  /**
   * Returns an object containing the current microstore state, the `getState`, `on`, and `emit` functions from the microstore instance, and the `mutate` function for updating the state.
   * @type {Object} An object containing the current microstore state and related functions.
   */
  return {
    state,
    mutate,
    getState: _store.getState,
    on: _store.on,
    emit: _store.emit,
  };
};

/**
 * The microstore instance used by the custom hook.
 * @type {Object}
 */
export const store = iBrainMicroStore();

/**
 * A custom hook for subscribing to events in the microstore.
 * @param {string} event - The name of the event to subscribe to.
 * @param {Function} handler - The callback function to be called when the event is emitted.
 */
export const useOn = (event, handler) => {
  React.useEffect(() => {
    return store.on(event, handler);
  }, []);
};

/**
 * A custom hook for accessing the microstore instance.
 * @type {Function}
 */
export const useMicroStore = createUseMicroStore(store);
