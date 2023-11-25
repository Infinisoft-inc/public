import { EventHub } from "@brainstack/hub";
import { Logger } from "@brainstack/log";
import { WebSocket } from "ws";

/**
 * Configuration options for a socket connection.
 */
export type ConnectionConfig = {
  /**
   * The host address of the socket server.
   */
  host: string;

  /**
   * The port number of the socket server.
   */
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
  connect: (destination: ConnectionConfig) => WebSocket;

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

}

/**
 * Configuration options for the bridge client.
 */
export interface BridgeClientOption {
  /**
   * The logger instance for the bridge client.
   */
  logger?: Logger;

  /**
   * The event hub instance for the bridge client.
   */
  hub?: EventHub;

}

/**
 * Factory function for creating a bridge client.
 */
export interface BridgeClientFactory {
  /**
   * Creates a bridge client with the provided options.
   * @param options - The options for configuring the bridge client.
   * @returns The created bridge client instance.
   */
  (options?: BridgeClientOption): BridgeClient;
}