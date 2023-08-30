import React, { createContext, useContext, useEffect } from 'react';
import {
  createLogger,
  createStore,
  createAuthProvider,
} from '@brainstack/core';
import {
  BrainStackProviderProps,
  TBrainStackContext,
  TBrainstackOptions,
} from './abstraction';

const createUseOn =
  (store: ReturnType<typeof createStore>) =>
  (event: string, handler: Function) => {
    useEffect(() => {
      const removeHandler = store.on(event, handler);
      return () => removeHandler();
    }, []);
  };

const createBrainStackProvider =
  (core: any, BrainStackContext: any): React.FC<BrainStackProviderProps> =>
  ({ children }) => {
    React.useSyncExternalStore(core.store.subscribe, core.store.getState);

    return (
      <BrainStackContext.Provider value={{ ...core }}>
        {children}
      </BrainStackContext.Provider>
    );
  };

/**
 * Create a Brainstack instance with the specified options.
 *
 * @param {TBrainstackOptions} options - Options for configuring the Brainstack instance.
 * @returns {{ useBrainStack: function, BrainStackProvider: React.FC }} Object containing the useBrainStack hook and BrainStackProvider component.
 *
 * @example
 * // Creating a Brainstack instance with custom options
 * const options = {
 *   eventHubOptions: [], // Custom options for event hub
 *   stateOptions: {},    // Custom options for state initialization
 *   loggerOptions: [],   // Custom options for logger
 *   authIntegration: {   // Custom options for authentication integration
 *     // ... authentication integration settings ...
 *   },
 * };
 * const brainstack = createBrainstack(options);
 * const { useBrainStack, BrainStackProvider } = brainstack;
 */

export const createBrainstack = (options: TBrainstackOptions) => {
  const {
    eventHubOptions = [],
    stateOptions,
    loggerOptions = [],
    authIntegration,
  } = options;
  const store = createStore({ initializer: stateOptions, eventHubOptions });
  const log = createLogger(...loggerOptions);
  const auth = authIntegration
    ? createAuthProvider(authIntegration)
    : undefined;
  const useOn = createUseOn(store);
  const core = {
    store,
    log,
    useOn,
    auth,
  };
  const BrainStackContext = createContext<TBrainStackContext>(core);
  const useBrainStack = () => useContext(BrainStackContext);
  const BrainStackProvider = createBrainStackProvider(core, BrainStackContext);

  return { useBrainStack, BrainStackProvider };
};
