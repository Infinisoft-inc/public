import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createEventHub, createLogger, createState } from '@brainstack/core';
import { BrainStackProviderProps } from './abstraction';

type TBrainstackOptions = {
  eventHubOptions?: Parameters<typeof createEventHub>;
  stateOptions?: Parameters<typeof createState>;
  loggerOptions?: Parameters<typeof createLogger>;
};

// type TBrainstackFactory = (options: TBrainstackOptions) => {};

const createUseOn =
  (hub: ReturnType<typeof createEventHub>) =>
  (event: string, handler: Function) => {
    useEffect(() => {
      const removeHandler = hub.on(event, handler);
      return () => removeHandler();
    }, []);
  };

const createBrainStackProvider =
  (core: any, BrainStackContext: any): React.FC<BrainStackProviderProps> =>
  ({ children }) => {
    const [data, setData] = useState(core);

    // Sync external store with data
    React.useSyncExternalStore(
      () =>
        core.hub.on(/.*/, (e: any) => {
          core.log.info(`useSyncExternalStore Event Triggered `, e);
        }),
      () => setData
    );

    return (
      <BrainStackContext.Provider value={{ ...data }}>
        {children}
      </BrainStackContext.Provider>
    );
  };

const BrainStackContext = createContext(null);
export const useBrainStack = () => useContext(BrainStackContext);

export const useCreateBrainstack = (options: TBrainstackOptions) => {
  const { eventHubOptions = [], stateOptions, loggerOptions = [] } = options;
  const hub = useMemo(
    () => createEventHub(...eventHubOptions),
    [eventHubOptions]
  );
  const state = useMemo(() => createState(stateOptions), [stateOptions]);
  const log = useMemo(() => createLogger(...loggerOptions), [loggerOptions]);
  const useOn = createUseOn(hub);
  const core = useMemo(
    () => ({
      hub,
      state,
      log,
      useOn,
    }),
    [hub, state, log, useOn]
  );

  const BrainStackProvider = createBrainStackProvider(core, BrainStackContext);

  return { BrainStackProvider };
};
