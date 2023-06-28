/// <reference path="../../typings/index.d.ts" />
import { WebSocket } from "ws";
import { Logger, EventHub } from "../../typings";

export interface BridgeOptions {
  logger: Logger;
  hub: EventHub;
  ws: WebSocket;
}

export interface Bridge {
  stop: () => void;
  start: () => void;
  logger: Logger;
  hub: EventHub;
  ws: WebSocket;
}

export interface BridgeFactory {
  (
      options: BridgeOptions,
  ): Bridge;
}
