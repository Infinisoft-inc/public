import { createEventHub, EventHub } from '@brainstack/hub';
import { createLogger, Logger } from '@brainstack/log';
import { BridgeClientFactory, ConnectionConfig } from './abstraction';
import { WebSocket } from 'ws';

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
  const logger: Logger = options.logger ?? createLogger();
  const hub: EventHub = options.hub ?? createEventHub();
  let client: WebSocket | null = null;
  let heartbeat: NodeJS.Timeout | null = null;
  let reconnectInterval: NodeJS.Timeout | null = null;

  /**
   * Establishes a connection with the specified destination.
   *
   * @param {ConnectionConfig} destination The host and port to connect to.
   * @returns {WebSocket} The WebSocket client instance.
   *
   * @throws {Error} Will throw an error if the bridge client is already connected.
   */

  const connect = (destination: ConnectionConfig) => {
    if (client) {
      throw new Error('Client is already connected.');
    }

    const { host, port } = destination;
    const url = `ws://${host}:${port}/ws`;

    const stopHeartbeat = (): void => {
      if (heartbeat) clearInterval(heartbeat);
      logger.info(`Bridge Heartbeat Stopped.`);
      hub.emit('bridge.heartbeat.stopped', client);
    };

    const startHeartbeat = (): void => {
      if (heartbeat) clearInterval(heartbeat);
      logger.info(`Bridge Heartbeat Started.`);
      hub.emit('bridge.heartbeat.started', client);

      heartbeat = setInterval(() => {
        if (client?.readyState === WebSocket.CLOSED) {
          connectWebSocket();
        }
        if (client?.readyState === WebSocket.OPEN) {
          stopHeartbeat();
        }
      }, 3000);
    };

    const connectWebSocket = () => {
      logger.info(`Connecting to ${url}`);
      client = new WebSocket(url);

      client.onopen = () => {
        logger.info(`Connected to ${url}`);
        hub.emit('bridge.connected', client);
        stopHeartbeat();
      };



      client.onmessage= (message: any) => {
        logger.log(`💬 Message Received: `, message);
    try{
          const data = JSON.parse(message?.data || '{}');
          const { event = 'unknown', ...payload } = data;
          hub.emit(event, payload);
        } catch (error: any) {
          logger.error(`Error parsing message: ${error.message}`);
          hub.emit("message", message);
        }
      };

      client.onclose = () => {
        logger.info(`Connection closed to ${url}`);
        hub.emit('bridge.disconnected');
        startHeartbeat();
      };

      client.onerror = (error) => {
        logger.error(`Error occurred on connection to ${url}:`, error);
        hub.emit('bridge.error', error);
        startHeartbeat();
      };

      return client;
    };

    const socket = connectWebSocket();
    reconnectInterval = setInterval(() => {
      if (client?.readyState === WebSocket.CLOSED) {
        connectWebSocket();
      }
    }, 5000);

    return socket;
  };

  const close = (): void => {
    if (reconnectInterval) clearInterval(reconnectInterval);
    client?.close();
    client = null;
  };

  return { connect, close, logger, hub };
};
