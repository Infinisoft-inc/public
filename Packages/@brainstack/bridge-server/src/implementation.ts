import WebSocket from 'ws';
import { createLogger, Logger } from '@brainstack/log';

class BridgeServer {
  private port: number;
  private host: string;
  public wss: WebSocket.Server;
  private uuidToSocket: Map<string, WebSocket>;
  private socketToUUID: Map<WebSocket, string>;
  private onMessageCallback: (data: string, uuid: string) => void;

  constructor(private logger: Logger = createLogger(5)) {
    this.port = Number(process.env.PORT || 7777);
    this.host = process.env.HOST || 'localhost';
    this.uuidToSocket = new Map();
    this.socketToUUID = new Map();
    this.wss = null;
    this.onMessageCallback = () => {};
  }

  public onMessage(callback: (data: string, uuid: string) => void): void {
    this.onMessageCallback = callback;
  }

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

  public listen({ host = this.host, port = this.port } = {}): void {
    this._listen({ host, port });
  }

  private _listen({ host, port }): void {
    this.wss = new WebSocket.Server({ port, host });
    this.logger.info(`WebSocket server started on ws://${host}:${port}`);

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

  private cleanupConnection(ws: WebSocket, uuid: string): void {
    this.socketToUUID.delete(ws);
    this.uuidToSocket.delete(uuid);
    this.logger.verbose(`Client connection closed with UUID: ${uuid}`);
  }

  public gracefulShutdown(): void {
    this.logger.info('Starting graceful shutdown of the BridgeServer.');
    this.wss.close(() => {
      this.logger.info('All connections closed, shutting down server.');
      process.exit(0);
    });
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}

export { BridgeServer };
