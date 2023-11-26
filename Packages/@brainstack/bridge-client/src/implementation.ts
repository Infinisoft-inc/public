import { createLogger, Logger } from '@brainstack/log';
import { BridgeClientOptions, EventHandler, Payload } from './abstraction';
import { WebSocket } from 'ws';

class BridgeClient {
  private url: string;
  private ws?: WebSocket;
  private reconnectInterval: number;
  private maxReconnectAttempts: number;
  private reconnectAttempts: number;
  private eventHandlers: Map<string, EventHandler[]>;
  public logger: Logger;

  constructor(options: BridgeClientOptions) {
    this.url = options.url;
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 10;
    this.reconnectAttempts = 0;
    this.eventHandlers = new Map();
    this.logger = options.logger || createLogger(5);

    this.logger.verbose('BridgeClient initialized with URL:', this.url, 'Reconnect Interval:', this.reconnectInterval, 'Max Reconnect Attempts:', this.maxReconnectAttempts);
  }

  public connect(): void {
    this.logger.verbose('Attempting to connect to WebSocket server at:', this.url);
    this.ws = new WebSocket(this.url);

    this.ws.on('open', () => {
      this.reconnectAttempts = 0;
      this.emitHandlers('open',null);
      this.logger.verbose('WebSocket connection established. Reconnect attempts reset to 0.');
    });

    this.ws.on('message', (payload: string) => {
      this.logger.verbose('Received message from server. Payload:', payload);
      this.processPayload(payload);
    });

    this.ws.on('close', () => {
      this.emitHandlers('close', null);
      this.attemptReconnect();
      this.logger.verbose('WebSocket connection closed. Attempting to reconnect...');
    });

    this.ws.on('error', (error: Error) => {
      this.emitHandlers('error', error);
      this.logger.error('WebSocket encountered an error:', error);
    });
  }

  private processPayload(payload: string): void {
    this.logger.verbose('Processing received payload:', payload);
    let parsedPayload: Payload;

    try {
      parsedPayload = JSON.parse(payload);
      this.logger.verbose('Parsed payload successfully. Event:', parsedPayload.event, 'Data:', parsedPayload.data);
      
      const handlers = this.eventHandlers.get(parsedPayload.event);
      if(handlers) {
        this.logger.verbose(`Found ${handlers.length} handlers for event: ${parsedPayload.event}`);
        handlers.forEach(handler => handler(parsedPayload.data));
      } else {
        this.logger.warn(`No handlers found for event: ${parsedPayload.event}`);
      }
    } catch (error) {
      this.logger.error('Failed to parse payload:', payload, 'Error:', error);
    }
  }

  public on(event: string, handler: EventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
      this.logger.verbose(`Created new handler array for event: ${event}`);
    }
    this.eventHandlers.get(event)?.push(handler);
    this.logger.verbose(`Handler added for event: ${event}`);
  }

  public send(event: string, data: any): void {
    this.logger.verbose(`Preparing to send message for event: ${event} with data:`, data);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
      this.logger.verbose(`Message sent for event: ${event}`);
    } else {
      this.logger.warn('WebSocket is not open. Unable to send message for:', { event, data });
    }
  }

  private emitHandlers(event: string, data: any): void {
    this.logger.verbose(`Emitting handlers for event: ${event} with data:`, data);
    const handlers = this.eventHandlers.get(event);
    handlers?.forEach(handler => {
      this.logger.verbose(`Executing handler for event: ${event}`);
      handler(data);
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => this.connect(), this.reconnectInterval);
      this.reconnectAttempts++;
      this.logger.verbose(`Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}. Trying again in ${this.reconnectInterval}ms.`);
    } else {
      this.logger.warn('Reached maximum number of reconnect attempts. Stopping reconnection process.');
    }
  }
}

export { BridgeClient };
