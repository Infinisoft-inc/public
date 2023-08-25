import { WebSocket, Server } from "ws";
import { EventHub } from "@brainstack/hub";
import { Logger } from "@brainstack/log";

/**
 * Interface representing a bridge server.
 */
export interface BridgeServer {
  /**
   * Starts listening on the specified socket configuration.
   * @param config - The socket configuration for the server.
   * @returns The WebSocket server instance.
   */
  listen: (options: { host: string; port: number }) => Server;

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
export interface BridgeServerOption {
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
export interface BridgeServerFactory {
  /**
   * Creates a bridge server with the provided options.
   * @param options - The options for configuring the bridge server.
   * @returns The created bridge server instance.
   */
  (options?: BridgeServerOption): BridgeServer;
}