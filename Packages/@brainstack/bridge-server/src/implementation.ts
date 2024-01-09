import WebSocket from 'ws';
import { createLogger, Logger } from '@brainstack/log';

/**
 * A WebSocket server implementation that allows for bidirectional communication between clients.
 */
class BridgeServer {
  /**
   * The port number that the WebSocket server will listen on. Defaults to 7777.
   */
  private port: number;
  /**
   * The hostname or IP address that the WebSocket server will listen on. Defaults to 'localhost'.
   */
  private host: string;
  /**
   * The WebSocket.Server instance that handles incoming connections.
   */
  public wss: WebSocket.Server;
  /**
   * A Map that maps unique UUIDs to WebSocket connections.
   */
  private uuidToSocket: Map<string, WebSocket>;
  /**
   * A Map that maps WebSocket connections to unique UUIDs.
   */
  private socketToUUID: Map<WebSocket, string>;
  /**
   * A callback function that is called whenever a message is received from a client.
   */
  public onMessageCallback: (data: string, uuid: string) => void;

  /**
   * Creates a new instance of the BridgeServer class.
   * @param logger - An instance of the @brainstack/log logger. The log level can be specified by passing a number between 1 and 5, where 1 is errors only log level and 5 is verbose the most detailed log level.
   */
  constructor(private logger: Logger = createLogger(5)) {
    this.port = Number(process.env.PORT || 7777);
    this.host = process.env.HOST || 'localhost';
    this.uuidToSocket = new Map();
    this.socketToUUID = new Map();
    this.wss = null;
    this.onMessageCallback = () => {};
  }

  /**
   * Sets the callback function that is called whenever a message is received from a client.
   * @param callback - The callback function to set.
   */
  public onMessage(callback: (data: string, uuid: string) => void): void {
    this.onMessageCallback = callback;
  }

  /**
   * Broadcasts a message to all connected clients, excluding the sender.
   * @param sender - The WebSocket connection of the sender.
   * @param rawData - The message data to broadcast.
   */
  public broadcast(sender: WebSocket, rawData: string): void {
    this.wss.clients.forEach((client) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(rawData, (err) => {
          if (err) {
            this.logger.error('Error failed to broadcast to client:', err);
          }
        });
      }
    });
  }

  /**
   * Starts the WebSocket server and begins listening for incoming connections.
   * The `options` parameter can either be an object with an `http.Server` property, or an object with `host` and `port` properties.
   * @param options - The options for starting the WebSocket server.
   */
  public listen(options: any): void {
    if (options?.server){
      this.wss = new WebSocket.Server({ server: options.server });
      this._listen()
      return;
    }

    if (options?.host && options?.port){
      this.wss = new WebSocket.Server({ host:options.host, port:options.port });
      this._listen()
      return;
    }

    throw Error("The listen() function has bad argument.")
  }
  
  /**
   * Called by the `listen()` method, this method sets up event listeners for incoming connections and handles cleaning up after a client disconnects.
   * @private
   */
  private _listen(): void {
    this.logger.info(`WebSocket server started.`);

    this.wss.on('connection', (ws: WebSocket) => {
      const uuid = this.generateUUID();
      this.uuidToSocket.set(uuid, ws);
      this.socketToUUID.set(ws, uuid);

      ws.on('message', (rawData) => {
        this.logger.verbose(`Message received from UUID: ${uuid}:`, rawData.toString());
        this.onMessageCallback(rawData.toString(), uuid);
      });

      ws.on('close', () => {
        this.cleanupConnection(ws, uuid);
      });

      ws.on('error', (error) => {
        this.logger.error(`Error on client connection with UUID: ${uuid}:`, error);
        this.cleanupConnection(ws, uuid);
      });
    });
  }

  /**
   * Removes a client's WebSocket connection and UUID from the `uuidToSocket` and `socketToUUID` Maps.
   * @param ws - The WebSocket connection to remove.
   * @param uuid - The UUID of the client to remove.
   */
  private cleanupConnection(ws: WebSocket, uuid: string): void {
    this.socketToUUID.delete(ws);
    this.uuidToSocket.delete(uuid);
    this.logger.verbose(`Client connection closed with UUID: ${uuid}`);
  }

  /**
   * Gracefully shuts down the WebSocket server by closing all connections and then exiting the process.
   */
  public gracefulShutdown(): void {
    this.logger.info('Starting graceful shutdown of the BridgeServer.');
    this.wss.close(() => {
      this.logger.info('All connections closed, shutting down server.');
      process.exit(0);
    });
  }

  /**
   * Generates a unique UUID for a new client connection.
   * @returns A unique UUID.
   */
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}

export { BridgeServer };
