import { createLogger, Logger } from '@brainstack/log';
import WebSocket, { Server as WebSocketServer } from 'ws';
import { Handler } from './abstraction'; // Ensure this is defined in your project
import Redis from 'ioredis';

const PORT = Number(process.env.PORT || 7777);
const HOST = process.env.HOST || 'localhost';
const REDIS_CHANNEL =  process.env.REDIS_CHANNEL || 'ibrain';

class BridgeServer {
  private port: number;
  private host: string;
  private wss: WebSocketServer;
  private eventHandlers: Map<string, Handler[]>;
  private uuidToSocket: Map<string, WebSocket>;
  private socketToUUID: Map<WebSocket, string>;
  public logger: Logger;
  private redisSubscriber: Redis;
  private redisPublisher: Redis;

  constructor(logger?: Logger) {
    this.port = PORT;
    this.host = HOST;
    this.logger = logger || createLogger(5);
    this.eventHandlers = new Map();
    this.uuidToSocket = new Map();
    this.socketToUUID = new Map();

    // Initialize Redis clients for subscribing and publishing
    this.redisSubscriber = new Redis();
    this.redisPublisher = new Redis();

    this.subscribeToRedis();
    this.start();
  }

  private subscribeToRedis(): void {
    this.redisSubscriber.subscribe(REDIS_CHANNEL, (err, count) => {
      if (err) {
        this.logger.error('Failed to subscribe to Redis channel:', err);
        return;
      }
      this.logger.verbose(`Subscribed to Redis channel: "${REDIS_CHANNEL}" with count: ${count}`);
    });

    this.redisSubscriber.on('message', (channel, message) => {
      if (channel === REDIS_CHANNEL) {
        this.logger.verbose(`Received message from Redis on channel "${channel}":`, message);
        this.broadcastToClients(message);
      }
    });
  }

  private broadcastToClients(message: string): void {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  public start(): void {
    this.wss = new WebSocketServer({ port: this.port, host: this.host });
    this.setupListeners();
    this.logger.info(`WebSocket server started on ws://${this.host}:${this.port}`);
  }  
  
  
  private setupListeners(): void {
    this.wss.on('connection', (ws: WebSocket) => {
      const uuid = this.generateUUID();
      this.uuidToSocket.set(uuid, ws);
      this.socketToUUID.set(ws, uuid);
      
      this.logger.verbose(`New client connection established with UUID: ${uuid}`);
      
      ws.on('message', (payload) => {
        this.logger.verbose(`Received payload from client:`, payload.toString());
        // You can now process the payload and potentially publish the data to Redis
        this.publishToRedis(payload.toString())
      });

      ws.on('close', () => {
        this.logger.verbose(`Client connection closed with UUID: ${uuid}`);
        // Clean up the UUID and socket mapping
        this.socketToUUID.delete(ws);
        this.uuidToSocket.delete(uuid);
      });

      ws.on('error', (error) => {
        this.logger.error(`Error on client connection with UUID: ${uuid}:`, error);
      });
    });
  }

  public publishToRedis(data: any): void {
    const message = JSON.stringify(data);
    this.redisPublisher.publish(REDIS_CHANNEL, message);
    this.logger.verbose(`Published message to Redis channel "${REDIS_CHANNEL}":`, message);
  }

  private generateUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}

export { BridgeServer };
