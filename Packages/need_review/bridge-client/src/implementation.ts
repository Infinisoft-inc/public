import { createEventHub } from "@brainstack/hub";
import { createLogger } from "@brainstack/log";
import { BridgeClientFactory, ConnectionConfig } from "./abstraction";

/**
 * Creates a new bridge client instance with the provided configuration options.
 *
 * @param {BridgeClientOption} [options] - Optional configuration options for the bridge client.
 * @param {Logger} [options.logger] - Optional logger instance to use for logging.
 * @param {EventHub} [options.hub] - Optional event hub instance to use for communication.
 * @param {WebSocket} [options.ws_client] - Optional WebSocket instance to use for the client connection.
 * @returns {BridgeClient} An instance of the bridge client.
 *
 * @throws {Error} Will throw an error if the bridge client is already connected.
 *
 * @example
 * const bridgeClient = createBridgeClient();
 * bridgeClient.connect({ host: "localhost", port: 3000 });
 */
export const createBridgeClient: BridgeClientFactory = (options = {}) => {
  const logger = options.logger ?? createLogger();
  const hub = options.hub ?? createEventHub();
  let client: WebSocket;
  let heartbeat: any;
  let reconnectInterval: any;

  /**
   * Establishes a connection with the specified destination.
   *
   * @param {ConnectionConfig} destination The host and port to connect to.
   * @returns {WebSocket} The WebSocket client instance.
   *
   * @throws {Error} Will throw an error if the bridge client is already connected.
   */
  const connect = (destination: ConnectionConfig): WebSocket => {
    if (client) {
      return client;
    }

    const { host, port } = destination;
    const url = `ws://${host}:${port}/ws`;

    /**
     * Stops the heartbeat for the WebSocket client.
     */
    const stopHeartbeat = () => {
      clearInterval(heartbeat);
      logger.info(`Bridge Heartbeat Stopped.`);
      hub.emit("bridge.heartbeat.stopped", client);
    };

    /**
     * Starts the heartbeat for the WebSocket client.
     */
    const startHeartbeat = () => {
      clearInterval(heartbeat);
      logger.info(`Bridge Heartbeat Started.`);
      hub.emit("bridge.heartbeat.started", client);

      heartbeat = setInterval(() => {
        hub.emit("bridge.heartbeat.beat", client);
        if (client.readyState === client.CLOSED) {
          connectWebSocket(); // Try to reconnect
        }

        if (client.readyState === client.OPEN) {
          stopHeartbeat();
        }
      }, 3000);
    };

    /**
     * Connects to the WebSocket.
     */
    const connectWebSocket = () => {
      logger.info(`Connecting to ${url}`);
      client = new WebSocket(url);

      client.onopen = () => {
        logger.info(`Connected to ${url}`);
        hub.emit("bridge.connected", client);
        stopHeartbeat();
      };

      client.onmessage = (e) => {
        const { event = "unknown", ...payload } = JSON.parse(e?.data ?? {});
        logger.log(`Received event ${event} from ${url}: `, payload);
        hub.emit(event, payload);
      };

      client.onclose = () => {
        logger.info(`Connection closed to ${url}`);
        hub.emit("bridge.disconnected");
        startHeartbeat();
      };

      client.onerror = (error) => {
        logger.error(`Error occurred on connection to ${url}:`, error);
        hub.emit("bridge.error", error);
        startHeartbeat();
      };
    };

    connectWebSocket();

    // Try to reconnect every 5 seconds
    reconnectInterval = setInterval(() => { if (client.readyState === client.CLOSED) { connectWebSocket(); } }, 5000);

    return client;
  };

  /**    
  Closes the WebSocket client connection. 
  */
  const close = () => {
    clearInterval(reconnectInterval);
    if (client) {
      client.close();
    }
  };
  return { connect, close, logger, hub };
};

