import { WebSocket, Server } from "ws";
import { EventHub } from "@brainstack/hub";
import { Logger } from "@brainstack/log";

export interface SocketConfig { host: string, port: number }

export interface BridgeClient {
  connect: (destination: SocketConfig) => WebSocket;
  close: () => void,
  logger: Logger;
  hub: EventHub;
  ws_client?: WebSocket;
}
export interface BridgeOptionsClient {
  logger?: Logger;
  hub?: EventHub;
  ws_client?: WebSocket;
  ws_server?: Server;
}

export interface BridgeFactoryClient {
  (
    options: BridgeOptionsClient
  ): BridgeClient;
}


export interface BridgeServer {
  listen: (config: SocketConfig) => Server;
  close: () => void,
  logger: Logger;
  hub: EventHub;
  ws_server?: Server;
}

export interface BridgeOptionsServer {
  logger?: Logger;
  hub?: EventHub;
  ws_server?: Server;
}

export interface BridgeFactoryServer {
  (
    options: BridgeOptionsServer
  ): BridgeServer;
}