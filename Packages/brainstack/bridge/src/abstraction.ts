import { WebSocket } from "ws";

export interface LoggerIntegration {
  log(...message: any): void;
  error(...message: any): void;
}

export interface MicroBridgeServerOptions {
  reconnectDelayInMs?: number;
  logger: LoggerIntegration;
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
