/**
 * This module exports a React context provider component for a microstore, along with some helper functions.
 * @module MicroStoreProvider
 */

import React from "react";
import { iBrainMicroStore } from "@brainstack/microstore";
import { createUseMicroStore } from "./useMicroStore";

/**
 * The React context for sharing state and functions related to the microstore.
 * @type {React.Context}
 */
const MicroContext = React.createContext(null);

/**
 * A custom hook for accessing the microstore context.
 * @returns {Object} An object containing state and functions related to the microstore.
 */
export const useMicroContext = () => React.useContext(MicroContext);

/**
 * The microstore instance used by the provider component.
 * @type {Object}
 */
const store = iBrainMicroStore();

/**
 * A custom hook for accessing the microstore instance.
 * @returns {Object} The microstore instance.
 */
const useStore = createUseMicroStore(store);

/**
 * A React component that provides the microstore context to its child components.
 * @param {Object} props - The props for the component.
 * @param {Object} props.children - The child components that will receive the microstore context.
 * @returns {JSX.Element} The component that provides the microstore context.
 */
export const MicroStoreProvider = ({ children }) => {

  const _store = useStore();

  /**
   * Subscribes to changes in the microstore state.
   * @param {Function} callback - The callback function to be called when the state changes.
   * @returns {Function} A function that can be called to unsubscribe from the state changes.
   */
  const subscribe = (callback) => {
    return _store.on("state.changed", () => callback(state));
  };

  /**
   * Updates the microstore state with a new value.
   * @param {any} val - The new value to be set as the microstore state.
   */
  const mutate = (val) => {
    _store.mutate(val);
  };

  /**
   * Synchronizes the local state with the microstore state and returns the current state.
   * @type {Object} The current state of the microstore.
   */
  const state = React.useSyncExternalStore(subscribe, _store.getState);

  /**
   * A custom hook for subscribing to events in the microstore.
   * @param {string} event - The name of the event to subscribe to.
   * @param {Function} handler - The callback function to be called when the event is emitted.
   */
  const useOn = (event, handler) => {
    React.useEffect(() => {
      return _store.on(event, handler);
    }, []);
  };
  
  /**
   * Renders the microstore context provider component.
   * @returns {JSX.Element} The microstore context provider component.
   */
  return (
    <MicroContext.Provider value={{state, mutate, emit: _store.emit, on: _store.on, getState: _store.getSTate, useOn}}>
      {children}
    </MicroContext.Provider>
  );
};
