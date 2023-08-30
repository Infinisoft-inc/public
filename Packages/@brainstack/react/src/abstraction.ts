import {
  createEventHub,
  Logger,
  createLogger,
  createState,
  TStore,
  AuthProvider,
  AuthIntegration,
} from '@brainstack/core';
import { ReactNode } from 'react';

export type TBrainStackContext = {
  useOn: (event: string, handler: Function) => void;
  store: TStore;
  log: Logger;
  auth: AuthProvider
};

export interface BrainStackProviderProps {
  children: ReactNode;
}

export type TBrainstackOptions = {
  eventHubOptions?: Parameters<typeof createEventHub>;
  stateOptions?: Parameters<typeof createState>;
  loggerOptions?: Parameters<typeof createLogger>;
  authIntegration: AuthIntegration;
};
