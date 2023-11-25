import { WebSocket, Server } from 'ws';
import { createEventHub, EventHub } from '@brainstack/hub';
import { Logger, createLogger } from '@brainstack/log';
import { BridgeServerFactory, BridgeServerOption } from './abstraction';

/**
 * Handles the "listening" event of the WebSocket server.
 * @param logger - The logger instance for the bridge server.
 * @param hub - The event hub instance for the bridge server.
 * @param options - The socket configuration for the server.
 */
const onListening = (
  logger: Logger,
  hub: EventHub,
  options: { host: string; port: number }
): void => {
  logger.info(`🚀 Bridge server started on `, options.host, options.port);
  hub.emit('start');
};

/**
 * Handles the "connection" event of the WebSocket server.
 * @param logger - The logger instance for the bridge server.
 * @param hub - The event hub instance for the bridge server.
 * @param ws - The WebSocket instance for the connection.
 */
const onConnection = (logger: Logger, hub: EventHub, ws: WebSocket): void => {
  const { url } = ws;

  logger.info(`🔗 Client connected: `, url);
  hub.emit('connection', ws);

  ws.on('message', (message: any) => {
    logger.log(`💬 Message Received: `, message);

    try{
    const { event = 'unknown', ...payload } = JSON.parse(
      message?.data?.toString() || '{}'
    );
    hub.emit(event, payload);
    }catch(err){
        hub.emit("message", message);
    }
  });
};

/**
 * Handles the "close" event of the WebSocket server.
 * @param logger - The logger instance for the bridge server.
 * @param hub - The event hub instance for the bridge server.
 */
const onClose = (logger: Logger, hub: EventHub): void => {
  logger.info(`⚠️ Bridge server closed`);
  hub.emit('close');
};

/**
 * Handles the "error" event of the WebSocket server.
 * @param logger - The logger instance for the bridge server.
 * @param hub - The event hub instance for the bridge server.
 * @param error - The error that occurred.
 */
const onError = (logger: Logger, hub: EventHub, error: any): void => {
  logger.error(`❌Bridge server error: ${error}`);
  hub.emit('error', error);
};

/**
 * Factory function that creates a bridge server instance.
 *
 * @function
 * @param {BridgeServerOption} [options] - Optional configuration options for the bridge server.
 * @param {Logger} [options.logger] - Optional logger instance to use for logging.
 * @param {EventHub} [options.hub] - Optional event hub instance to use for communication.
 * @param {WebSocket.Server} [options.ws_server] - Optional WebSocket server instance to use for connections.
 * @returns {BridgeServerInstance} - An instance of the bridge server.
 */

export const createBridgeServer: BridgeServerFactory = (
  options?: BridgeServerOption
) => {
  const logger = options?.logger ?? createLogger();
  const hub = options?.hub ?? createEventHub();
  const ws_server = options?.ws_server;

  /**
   * Starts listening for incoming connections on the specified host and port.
   *
   * @function
   * @param {object} options - Configuration options for the server.
   * @param {string} options.host - Host address to listen on.
   * @param {number} options.port - Port number to listen on.
   * @returns {WebSocket.Server} - The WebSocket server instance used for connections.
   */
  const listen = (options: { host: string; port: number }): Server => {
    const server = ws_server || new Server(options);

    server.on('listening', () => onListening(logger, hub, options));

    server.on('connection', (ws: WebSocket) => onConnection(logger, hub, ws));

    server.on('close', () => onClose(logger, hub));

    server.on('error', (error: any) => onError(logger, hub, error));

    return server;
  };

  const close = (): void => {
    if (ws_server) {
      ws_server.close();
    }
  };

  return { listen, close, logger, hub, ws_server };
};
