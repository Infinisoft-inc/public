import {
  createEventHub,
  Logger,
  createLogger,
  createState,
  TStore,
  AuthProvider,
  AuthIntegration,
  CRUDIntegration,
  CRUD,
} from '@brainstack/core';
import { ReactNode } from 'react';

export type TBrainStackContext = {
  useOn: (event: string, handler: Function, deps: any[]) => void;
  store: TStore;
  log: Logger;
  auth?: AuthProvider;
  fs?: CRUD<unknown>;
};

export interface BrainStackProviderProps {
  children: ReactNode;
}

export type TBrainstackOptions = {
  eventHubOptions?: Parameters<typeof createEventHub>;
  stateOptions?: Parameters<typeof createState>;
  loggerOptions?: Parameters<typeof createLogger>;
  authIntegration?: AuthIntegration;
  crudIntegration?: CRUDIntegration<unknown>;
};
