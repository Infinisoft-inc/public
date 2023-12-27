import { createLogger, Logger } from '@brainstack/log';
import { BridgeClientOptions } from './abstraction';
import { WebSocket } from 'ws';
import { createEventHub, EventHub } from '@brainstack/hub';

class BridgeClient {
  private url: string;
  private ws?: WebSocket;
  private reconnectInterval: number;
  private maxReconnectAttempts: number;
  private reconnectAttempts: number;
  private shouldAttemptReconnect: boolean;

  private logger: Logger;
  private hub: EventHub;

  constructor(options: BridgeClientOptions) {
    this.url = options.url;
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 10;
    this.reconnectAttempts = 0;
    this.shouldAttemptReconnect = true;
    this.logger = options.logger || createLogger(5);
    this.hub =
      options.hub || createEventHub({ source: '', logger: this.logger });
    this.logger.verbose(
      'BridgeClient initialized with URL:',
      this.url,
      'Reconnect Interval:',
      this.reconnectInterval,
      'Max Reconnect Attempts:',
      this.maxReconnectAttempts
    );
  }

  public connect(): void {
    this.logger.verbose(
      'Attempting to connect to WebSocket server at:',
      this.url
    );
    this.ws = new WebSocket(this.url);

    this.hub.on(
      /^(macro|meso)\.dts\.rawdata\.outgoing$/,
      (payload: any) => {
        this.logger.verbose('Received message from server. Payload:', payload);
        this.ws?.send(payload)
      }
    );

    this.ws.addEventListener('open', () => {
      this.reconnectAttempts = 0;
      this.logger.verbose(
        'WebSocket connection established. Reconnect attempts reset to 0.'
      );
    });

    this.ws.addEventListener('message', (payload) => {
      this.hub.emit('micro.websocket.rawdata.incoming', payload);
      this.logger.verbose(
        'Received message from server. Payload:',
        payload.data
      );
    });

    this.ws.addEventListener('close', () => {
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

    this.ws.addEventListener('error', (error) => {
      this.logger.error('WebSocket encountered an error:', error);
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => this.connect(), this.reconnectInterval);
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

export { BridgeClient };
