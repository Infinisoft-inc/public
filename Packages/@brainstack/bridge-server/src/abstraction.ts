import { WebSocket, Server } from "ws";
import { EventHub } from "@brainstack/hub";
import { Logger } from "@brainstack/log";

export interface BridgeServerOptions {
  port?: number;
  host?: string;
  onConnection?: (socket: WebSocket) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
  logger?: Logger;
}

export type EventHandler = (payload: Buffer, socket: WebSocket) => void