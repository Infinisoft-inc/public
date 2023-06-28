import { WebSocket, Server } from "ws";
import { EventHub } from "@brainstack/hub";
import { Logger } from "@brainstack/log";

/**
 * Configuration for the socket connection.
 */
export interface SocketConfig {
  host: string;
  port: number;
}

/**
 * Interface representing a bridge client.
 */
export interface BridgeClient {
  /**
   * Connects to the destination socket using the provided configuration.
   * @param destination - The socket configuration for the destination.
   * @returns The WebSocket instance representing the connection.
   */
  connect: (destination: SocketConfig) => WebSocket;

  /**
   * Closes the bridge client connection.
   */
  close: () => void;

  /**
   * The logger instance for the bridge client.
   */
  logger: Logger;

  /**
   * The event hub instance for the bridge client.
   */
  hub: EventHub;

  /**
   * The WebSocket instance representing the client connection.
   */
  ws_client?: WebSocket;
}

/**
 * Options for configuring the bridge client.
 */
export interface BridgeOptionsClient {
  /**
   * The logger instance for the bridge client.
   */
  logger?: Logger;

  /**
   * The event hub instance for the bridge client.
   */
  hub?: EventHub;

  /**
   * The WebSocket instance representing the client connection.
   */
  ws_client?: WebSocket;

  /**
   * The WebSocket server instance for the bridge server.
   */
  ws_server?: Server;
}

/**
 * Factory function for creating a bridge client.
 */
export interface BridgeFactoryClient {
  /**
   * Creates a bridge client with the provided options.
   * @param options - The options for configuring the bridge client.
   * @returns The created bridge client instance.
   */
  (options?: BridgeOptionsClient): BridgeClient;
}

/**
 * Interface representing a bridge server.
 */
export interface BridgeServer {
  /**
   * Starts listening on the specified socket configuration.
   * @param config - The socket configuration for the server.
   * @returns The WebSocket server instance.
   */
  listen: (config?: SocketConfig) => Server | undefined;

  /**
   * Closes the bridge server.
   */
  close: () => void;

  /**
   * The logger instance for the bridge server.
   */
  logger: Logger;

  /**
   * The event hub instance for the bridge server.
   */
  hub: EventHub;

  /**
   * The WebSocket server instance.
   */
  ws_server: Server | undefined;
}

/**
 * Options for configuring the bridge server.
 */
export interface BridgeOptionsServer {
  /**
   * The logger instance for the bridge server.
   */
  logger?: Logger;

  /**
   * The event hub instance for the bridge server.
   */
  hub?: EventHub;

  /**
   * The WebSocket server instance.
   */
  ws_server?: Server;
}

/**
 * Factory function for creating a bridge server.
 */
export interface BridgeFactoryServer {
  /**
   * Creates a bridge server with the provided options.
   * @param options - The options for configuring the bridge server.
   * @returns The created bridge server instance.
   */
  (options?: BridgeOptionsServer): BridgeServer;
}
