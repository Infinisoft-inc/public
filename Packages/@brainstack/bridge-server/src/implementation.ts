import { createLogger, Logger } from '@brainstack/log';
import { BridgeServerOptions, EventHandler } from './abstraction';
import WebSocket, { Server as WebSocketServer } from 'ws';

class BridgeServer {
  private port: number;
  private host: string;
  private wss?: WebSocketServer;
  private eventHandlers: Map<string, EventHandler[]>;
  public logger: Logger;
  options: BridgeServerOptions;

  constructor(options: BridgeServerOptions) {
    this.port = options.port || 3000;
    this.host = options.host || 'localhost';
    this.options = options;
    this.logger = options.logger || createLogger();
    this.eventHandlers = new Map();

    this.logger.verbose('BridgeServer initialized with options:', options);
  }

  private setupListeners(): void {
    this.logger.verbose('Setting up WebSocket server listeners');
    this.wss?.on('connection', (ws: WebSocket) => {
      this.logger.verbose('🔗 Client connected');
      this.options.onConnection?.(ws);

      ws.on('message', (payload: Buffer) => {
        this.logger.verbose('💬 Payload Received:', payload.toString());
        this.processPayload(payload, ws);
      });

      ws.on('close', () => {
        this.logger.verbose('⚠️ Connection closed');
        this.options.onClose?.();
      });

      ws.on('error', (error: Error) => {
        this.logger.error('❌ Error:', error);
        this.options.onError?.(error);
      });
    });
  }

  private processPayload(payloadBuffer: Buffer, socket: WebSocket): void {
    this.logger.verbose('Processing received payload');
    let parsedPayload;
    try {
      const payloadString = payloadBuffer.toString();
      parsedPayload = JSON.parse(payloadString);
      this.logger.verbose('Parsed payload successfully:', parsedPayload);

      if (parsedPayload && parsedPayload.event) {
        this.logger.verbose('Handling payload for event:', parsedPayload.event);
        const handlers = this.eventHandlers.get(parsedPayload.event);
        handlers?.forEach(handler => {
          this.logger.verbose('Executing handler for event:', parsedPayload.event);
          handler(parsedPayload.data, socket);
        });
      }
    } catch (error) {
      this.logger.error('Failed to parse payload:', payloadBuffer.toString(), 'Error:', error);
    }
  }

  public on(event: string, handler: EventHandler): void {
    this.logger.verbose(`Adding handler for event: ${event}`);
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
      this.logger.verbose(`Created new handler array for event: ${event}`);
    }
    this.eventHandlers.get(event)?.push(handler);
    this.logger.verbose(`Handler added for event: ${event}`);
  }

  public start(): void {
    this.logger.verbose('Starting WebSocket server');
    this.wss = new WebSocketServer({ port: this.port, host: this.host });
    this.setupListeners();
    this.logger.log(`Server started at ws://${this.host}:${this.port}`);
  }

  public emit(event: string, data: any): void {
    this.logger.verbose(`Emitting event: ${event}`);
    this.wss?.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event, data }));
        this.logger.verbose(`Emitted event: ${event} to clients`);
      }
    });
  }
}

export { BridgeServer };
