import { createStore } from ".";

export type TCreateStoreOptions = {
  initializer: any;
  eventHubOptions: any;
};

export type TStore = {
  subscribe: (callback: (_state: any) => void) => () => void;
  on: (event: string | RegExp, handler: Function) => () => void;
  emit: (event: string, payload?: any) => void;
  uuid: string;
  mutate: (mutator: (_state: any) => any) => void;
  getState(selector?: ((state: any) => any) | undefined): any;
}

export type TStoreFactory = (options?: TCreateStoreOptions) => TStore