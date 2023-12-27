import { EventHub } from '@brainstack/hub';
import { createLogger, Logger } from '@brainstack/log';
import WebSocket from 'ws';

const PORT = Number(process.env.PORT || 7777);
const HOST = process.env.HOST || 'localhost';

class BridgeServer {
  private port: number;
  private host: string;
  private wss: WebSocket.Server;
  private uuidToSocket: Map<string, WebSocket>;
  private socketToUUID: Map<WebSocket, string>;
  public logger: Logger;
  private hub: EventHub;

  constructor(hub: EventHub, logger?: Logger) {
    this.port = PORT;
    this.host = HOST;
    this.logger = logger ?? createLogger();
    this.uuidToSocket = new Map();
    this.socketToUUID = new Map();
    this.wss = null;
    this.hub = hub;
  }

  private broadcastToClients(rawData: string): void {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(rawData), (err) => {
          if (err) {
            this.logger.error('Error failed to broadcast to client:', err);
          }
        });
      }
    });
  }

  public start(): void {
    this.setupListeners();
    this.logger.info(
      `WebSocket server started on ws://${this.host}:${this.port}`
    );
  }

  private setupListeners(): void {
    this.wss = new WebSocket.Server({ port: this.port, host: this.host });

    this.wss.on('connection', (ws: WebSocket) => {
      this.hub.on(
        /^(macro|meso)\.dts\.rawdata\.outgoing$/,
        this.broadcastToClients.bind(this)
      );
      const uuid = this.generateUUID();
      this.uuidToSocket.set(uuid, ws);
      this.socketToUUID.set(ws, uuid);

      this.logger.verbose(
        `New client connection established with UUID: ${uuid}`
      );

      ws.on('message', (rawData) => {
        this.logger.verbose(
          'Received raw data from client:',
          rawData.toString()
        );
        this.hub.emit('micro.websocket.rawdata.incoming', rawData);
      });

      ws.on('close', () => {
        this.socketToUUID.delete(ws);
        this.uuidToSocket.delete(uuid);
        this.logger.verbose(`Client connection closed with UUID: ${uuid}`);
      });

      ws.on('error', (error) => {
        this.socketToUUID.delete(ws);
        this.uuidToSocket.delete(uuid);
        this.logger.error(
          `Error on client connection with UUID: ${uuid}:`,
          error
        );
      });
    });
  }

  public gracefulShutdown() {
    this.logger.info('Starting graceful shutdown of the BridgeServer.');
    this.wss.close(() => {
      this.logger.info('All connections closed, shutting down server.');
      process.exit(0);
    });
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
}

export { BridgeServer };
