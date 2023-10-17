import { State } from "@brainstack/state";
import { createStore } from ".";

export type TCreateStoreOptions = {
  initializer: any;
  eventHubOptions: any;
};

// export type TStore = {
//   subscribe: (callback: (_state: any) => void) => () => void;
//   on: (event: string | RegExp, handler: Function) => () => void;
//   emit: (event: string, payload?: any) => void;
//   uuid: string;
//   mutate: (mutator: (_state: any) => any) => void;
//   getState(selector?: ((state: any) => any) | undefined): any;
// }

export type TCRUDObjectOperations = {
  create: (item: any) => void;
  read: (item: { id: string }) => any;
  update: (item: any) => void;
  delete: (item: { id: string }) => void;
  list: () => any;
  search: (keyword: string) => any;
};

export type TCRUDArrayOperations = {
  create: (item: any) => string;
  read: (item: { id: string }) => any;
  update: (item: any) => void;
  delete: (item: { id: string }) => void;
  list: () => any[];
  search: (keyword: string) => any[];
};

export type TStore = {
  subscribe: (callback: (_state: any) => void) => () => void;
  on: (event: string | RegExp, handler: Function) => () => void;
  emit: (event: string, payload?: any) => void;
  uuid: string;
  mutate: (mutator: (_state: any) => any) => void;
  getState(selector?: ((state: any) => any) | undefined): any;

  createCRUDObject: (domain: keyof State<any>) => TCRUDObjectOperations;
  createCRUDArray: (domain: keyof State<any>) => TCRUDArrayOperations;
};

export type TStoreFactory = (options?: TCreateStoreOptions) => TStore