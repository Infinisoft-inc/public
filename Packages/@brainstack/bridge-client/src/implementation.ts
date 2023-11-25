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
    this.logger = options.logger || createLogger();

    this.logger.verbose('BridgeClient initialized with options:', options);
  }

  public connect(): void {
    this.logger.verbose('Initiating connection to WebSocket server at:', this.url);
    this.ws = new WebSocket(this.url);

    this.ws.on('open', () => {
      this.logger.verbose('WebSocket connection opened');
      this.reconnectAttempts = 0;
      this.emitHandlers('open', null);
      this.logger.verbose('Reset reconnectAttempts to 0 and emitted open event');
    });

    this.ws.on('message', (message: string) => {
      this.logger.verbose('Received message from WebSocket:', message);
      this.processMessage(message);
      this.logger.verbose('Processed the received message');
    });

    this.ws.on('close', () => {
      this.logger.verbose('WebSocket connection closed');
      this.emitHandlers('close', null);
      this.attemptReconnect();
      this.logger.verbose('Emitted close event and attempting to reconnect if necessary');
    });

    this.ws.on('error', (error: Error) => {
      this.logger.error('WebSocket encountered an error:', error);
      this.emitHandlers('error', error);
      this.logger.verbose('Emitted error event with error details');
    });
  }

  private processMessage(message: string): void {
    this.logger.verbose('Attempting to parse received message');
    let parsedMessage: Payload;

    try {
      parsedMessage = JSON.parse(message);
      this.logger.verbose('Parsed message successfully:', parsedMessage);

      if (parsedMessage && parsedMessage.event) {
        this.logger.verbose('Processing message for event:', parsedMessage.event);
        const handlers = this.eventHandlers.get(parsedMessage.event);
        handlers?.forEach((handler) => {
          this.logger.verbose('Executing handler for event:', parsedMessage.event);
          handler(parsedMessage.data);
        });
      }
    } catch (error) {
      this.logger.error('Failed to parse message:', message, 'Error:', error);
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

  public send(event: string, data: any): void {
    this.logger.verbose(`Preparing to send message - Event: ${event}, Data:`, data);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
      this.logger.verbose(`Message sent for event: ${event}`);
    } else {
      this.logger.verbose('WebSocket is not open. Message not sent:', { event, data });
    }
  }

  private emitHandlers(event: string, data: any): void {
    this.logger.verbose(`Emitting handlers for event: ${event}`);
    const handlers = this.eventHandlers.get(event);
    handlers?.forEach((handler) => {
      this.logger.verbose(`Executing handler for event: ${event}`);
      handler(data);
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.logger.verbose(`Attempting to reconnect. Attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts}`);
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
      this.reconnectAttempts++;
    } else {
      this.logger.verbose('Max reconnect attempts reached. Stopping reconnection attempts.');
    }
  }
}

export { BridgeClient };
