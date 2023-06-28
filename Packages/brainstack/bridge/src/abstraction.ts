/// <reference path="../../typings/index.d.ts" />
import { WebSocket } from "ws";
import { Logger } from "../../typings";

export interface MicroBridgeServerOptions {
  reconnectDelayInMs?: number;
  logger: Logger;
  hub: any;
  ws: WebSocket;
}

export interface MicroBridgeServerInstance {
  stop: () => void;
  start: () => void;
}

export interface MicroBridgeServer {
  (
      options: MicroBridgeServerOptions,
  ): MicroBridgeServerInstance;
}
