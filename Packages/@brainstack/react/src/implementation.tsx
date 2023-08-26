import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { createLogger, createStore } from '@brainstack/core';
import { BrainStackProviderProps, TBrainstackOptions } from './abstraction';

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

const BrainStackContext = createContext(null);

export const useBrainStack = () => useContext(BrainStackContext);
export const useCreateBrainstack = (options: TBrainstackOptions) => {
  const { eventHubOptions = [], stateOptions, loggerOptions = [] } = options;
  const store = useMemo(
    () => createStore({ initializer: stateOptions, eventHubOptions }),
    [stateOptions, eventHubOptions]
  );
  const log = useMemo(() => createLogger(...loggerOptions), [loggerOptions]);
  const useOn = createUseOn(store);
  const core = useMemo(
    () => ({
      store,
      log,
      useOn,
    }),
    [store, log, useOn]
  );

  const BrainStackProvider = createBrainStackProvider(core, BrainStackContext);

  return { BrainStackProvider };
};
