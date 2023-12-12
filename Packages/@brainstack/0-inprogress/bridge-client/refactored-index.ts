import WebSocket from 'ws';
import { createLogger } from '@brainstack/log';

const logger = createLogger();
let reconnectAttempt = 1;

class WebSocketClient {
  private ws?: WebSocket;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.on('open', () => {
      logger.info('Connected to WebSocket server.');
      reconnectAttempt = 1; // Reset on successful connection
    });

    this.ws.on('close', () => {
      const reconnectDelay = Math.min(1000 * (2 ** reconnectAttempt), 30000); // Cap at 30 seconds
      logger.info(`Disconnected. Reconnect attempt in ${reconnectDelay / 1000}s.`);
      setTimeout(() => this.connect(), reconnectDelay);
      reconnectAttempt++;
    });

    this.ws.on('message', (message: string) => {
      logger.info(`Message received: ${message}`);
      // Handle message here
    });

    this.ws.on('error', (err: Error) => {
      logger.error('WebSocket encountered an error:', err);
    });
  }

  public sendMessage(message: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      logger.warn('WebSocket is not open. Message not sent.');
    }
  }
}

export const wsClient = new WebSocketClient('ws://localhost:3000'); // Replace with your actual WebSocket server URL