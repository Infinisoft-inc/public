import { createLogger, Logger } from '@brainstack/log';
import WebSocket, { Server as WebSocketServer } from 'ws';
import { BridgeServerOptions, Handler } from './abstraction';

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || 'localhost';

class BridgeServer {
  private port: number;
  private host: string;
  private wss?: WebSocketServer;
  private eventHandlers: Map<string, Handler[]>;
  private uuidToSocket: Map<string, WebSocket>;
  private socketToUUID: Map<WebSocket, string>;
  public logger: Logger;
  options: BridgeServerOptions;

  constructor(options: BridgeServerOptions) {
    this.port = options?.port ?? PORT;
    this.host = options?.host ?? HOST;
    this.options = options;
    this.logger = options.logger || createLogger(5);
    this.eventHandlers = new Map();
    this.uuidToSocket = new Map();
    this.socketToUUID = new Map();

    this.logger.verbose(
      'BridgeServer initialized with options:',
      options,
      'Port:',
      this.port,
      'Host:',
      this.host
    );
  }

  private setupListeners(): void {
    this.wss?.on('connection', (ws: WebSocket) => {
      this.logger.verbose('🔗 New client connection established.');
      this.initiateConnexion(ws);

      ws.on('message', (payload: Buffer) => {
        this.logger.verbose(
          '💬 Received payload from client:',
          payload.toString()
        );
        this.processPayload(payload);
      });

      ws.on('close', () => {
        this.logger.verbose('⚠️ Client connection closed.');
        this.options.onClose?.();
      });

      ws.on('error', (error: Error) => {
        this.logger.error('❌ Error occurred on client connection:', error);
        this.options.onError?.(error);
      });
    });
  }

  private initiateConnexion(ws: WebSocket) {
    const uuid = generateUUID()
    this.uuidToSocket.set(uuid, ws);
    this.socketToUUID.set(ws,uuid);
    this.emit('newConnexion', { uuid });
  }

  private processPayload(payloadBuffer: Buffer): void {
    this.logger.verbose(
      'Processing received payload:',
      payloadBuffer.toString()
    );
    let parsedPayload;
    try {
      const payloadString = payloadBuffer.toString();
      parsedPayload = JSON.parse(payloadString);
      this.logger.verbose('Parsed payload successfully:', parsedPayload);

      if (parsedPayload && parsedPayload.event) {
        const handlers = this.eventHandlers.get(parsedPayload.event);
        if (handlers) {
          this.logger.verbose(
            `Found ${handlers.length} handlers for event: ${parsedPayload.event}`
          );
          handlers.forEach((handler) => handler(parsedPayload.data));
        } else {
          this.logger.warn(
            `No handlers found for event: ${parsedPayload.event}`
          );
        }
      }
    } catch (error) {
      this.logger.error(
        'Failed to parse payload:',
        payloadBuffer.toString(),
        'Error:',
        error
      );
    }
  }

  public emit(event: string, data: any): void {
    this.logger.verbose(`Emitting event: ${event} with data:`, data);
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      this.logger.verbose(
        `Found ${handlers.length} handlers for event: ${event}`
      );
      handlers.forEach((handler) => handler(data));
    } else {
      this.logger.warn(`No handlers found for event: ${event}`);
    }
  }

  public on(event: string, handler: Handler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
      this.logger.verbose(`Created new event handler list for event: ${event}`);
    }
    this.eventHandlers.get(event)?.push(handler);
    this.logger.verbose(`Handler added for event: ${event}`);
  }

  public start(): void {
    this.wss = new WebSocketServer({ port: this.port, host: this.host });
    this.setupListeners();
    this.logger.log(
      `WebSocket Server started at ws://${this.host}:${this.port}`
    );
  }

  public emitToUUID(uuid: string, event: string, data: any): void {
    this.logger.verbose(`Attempting to send event: ${event} to UUID: ${uuid}`);
    const socket = this.uuidToSocket.get(uuid);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ event, data }));
      this.logger.verbose(`Event: ${event} sent to UUID: ${uuid}`);
    } else {
      this.logger.warn(
        `Cannot send event: ${event} to UUID: ${uuid}. Socket not open or not found.`
      );
    }
  }

  public attachSocket(uuid: string, socket: WebSocket): void {
    this.logger.verbose(`Attaching socket to UUID: ${uuid}`);
    this.uuidToSocket.set(uuid, socket);
  }
}

function generateUUID(): string {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export { BridgeServer };
