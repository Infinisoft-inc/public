import React, { createContext, useContext, useEffect } from 'react';
import {
  createLogger,
  createStore,
  createAuthProvider,
  createCRUD,
} from '@brainstack/core';
import {
  BrainStackProviderProps,
  TBrainStackContext,
  TBrainstackOptions,
} from './abstraction';
import { DeepFieldMutator, createDeepFieldMutator } from './mutator';

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
    crudIntegration,
  } = options;
  const store = createStore({ initializer: stateOptions, eventHubOptions });
  const log = createLogger(...loggerOptions);
  const auth = authIntegration
    ? createAuthProvider(authIntegration)
    : undefined;
  const fs = crudIntegration ? createCRUD(crudIntegration) : undefined;
  const useOn = createUseOn(store);
  const core = {
    store,
    log,
    useOn,
    auth,
    fs,
  };
  const BrainStackContext = createContext<TBrainStackContext>(core);
  const useBrainStack = () => useContext(BrainStackContext);
  const BrainStackProvider = createBrainStackProvider(core, BrainStackContext);
  const createEventHandlerMutator = <T,>(
    fieldPath: string
  ): React.ChangeEventHandler<HTMLInputElement> => {
    const deepFieldMutator: DeepFieldMutator<T> =
      createDeepFieldMutator<T>(fieldPath);

    return (e) => {
      const newValue = e.target.value;
      core.store.mutate((prevState) => deepFieldMutator(newValue)(prevState));
    };
  };
  const getValue = (fieldPath: string): any => {
    const fields = fieldPath.split('.');
    let value = core.store.getState();

    for (const field of fields) {
      if (value && typeof value === 'object') {
        value = value?.[field] ?? ''; // To avoid confusing react for uncontrolled component. When changing value gives an error that it's switching to controlled.
      } else {
        return ''; // To avoid confusing react for uncontrolled component. When changing value gives an error that it's switching to controlled.
      }
    }

    return value;
  };

  return {
    useBrainStack,
    BrainStackProvider,
    core,
    createDeepFieldMutator,
    createEventHandlerMutator,
    getValue,
  };
};
