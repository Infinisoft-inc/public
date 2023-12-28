import { createLogger, Logger } from '@brainstack/log';
import WebSocket from 'ws';
import { createEventHub, EventHub } from '@brainstack/hub';
import { BridgeClientOptions } from './abstraction';

class BridgeClientNode {
  private ws?: WebSocket;
  private reconnectInterval: number;
  private maxReconnectAttempts: number;
  private reconnectAttempts: number;
  private shouldAttemptReconnect: boolean;
  public logger: Logger;
  public hub: EventHub;
  public onMessage?: (data: any) => void;
  private host: string;
  private port: number;

  constructor(options?: BridgeClientOptions) {
    this.reconnectInterval = options?.reconnectInterval || 5000;
    this.maxReconnectAttempts = options?.maxReconnectAttempts || 10;
    this.reconnectAttempts = 0;
    this.shouldAttemptReconnect = true;
    this.host = options?.host || 'localhost';
    this.port = options?.port || 8080;
    this.onMessage = options?.onMessage;
    this.logger =
      options?.logger ||
      createLogger(
        options?.logger?.level ?? 5,
        options?.logger?.integrations ?? []
      );
    this.hub =
      options?.hub ||
      createEventHub({
        ...(options?.hubOptions ?? {
          source: 'BrainstackHub',
          logger: this.logger,
        }),
      });
    this.logger.verbose(
      'BridgeClient initialized with default settings.'
    );
  }

  public connect(host: string, port: number): void {
    this.host = host;
    this.port = port;
    const url = `ws://${host}:${port}`;
    this.logger.verbose('Attempting to connect to WebSocket server at:', url);
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      this.reconnectAttempts = 0;
      this.logger.verbose(
        'WebSocket connection established. Reconnect attempts reset to 0.'
      );
    });

    this.ws.on('message', (event) => {
      const messageData = event; // Corrected to access data from event
      if (this.onMessage) {
        this.onMessage(messageData);
      }
      this.logger.verbose(
        'Received message from server. Message:',
        messageData
      );
    });

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.ws?.on('close', (e) => {
      if (this.shouldAttemptReconnect) {
        this.attemptReconnect();
        this.logger.verbose(
          'WebSocket connection closed. Attempting to reconnect...'
        );
      } else {
        this.logger.verbose(
          'WebSocket connection closed. Reconnect not attempted as shouldAttemptReconnect flag is false.'
        );
      }
    });

    this.ws?.on('error', (error) => {
      this.logger.error('WebSocket encountered an error:', error);
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        if (this.host && this.port) {
          this.connect(this.host, this.port);
        }
      }, this.reconnectInterval);
      this.reconnectAttempts++;
      this.logger.verbose(
        `Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}. Trying again in ${this.reconnectInterval}ms.`
      );
    } else {
      this.logger.warn(
        'Reached maximum number of reconnect attempts. Stopping reconnection process.'
      );
    }
  }
}

export { BridgeClientNode };
