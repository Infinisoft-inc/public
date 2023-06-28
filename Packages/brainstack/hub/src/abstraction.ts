
/// <reference path="../../typings/index.d.ts" />
import { Logger } from "../../typings";


export interface EventHub {
  on: (event: string | RegExp, handler: Function) => () => void;
  emit: (event: string, payload?: any) => void;
  uuid: string;
}

export interface Options {
  source: string;
  logger: Logger;
}
export type EventHubFactory = (options: Options) => EventHub
