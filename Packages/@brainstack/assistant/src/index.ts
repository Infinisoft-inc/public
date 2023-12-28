import { BridgeServer } from '@brainstack/bridge-server';
import { BridgeClientNode } from '@brainstack/bridge-client-node'; // Assuming this import
import { Logger, createLogger } from '@brainstack/log';
import { DataTransformationService } from '@brainstack/dts';
import { EventHub, createEventHub } from '@brainstack/hub';

export class ASSistant {
  private bridgeServer: BridgeServer;
  private bridgeClient: BridgeClientNode; // Added bridge client
  private logger: Logger;
  private dts: DataTransformationService;
  private hub: EventHub;

  constructor() {
    // Initialize the logger, bridge server, bridge client, event hub, and data transformation service
    this.logger = createLogger(5);
    this.bridgeServer = new BridgeServer(this.logger);
    this.bridgeClient = new BridgeClientNode({ logger: this.logger }); // Initialize bridge client with logger
    this.hub = createEventHub();
    this.dts = new DataTransformationService(this.hub, this.logger);
  }

  public listen(host: string, port: number): void {
    // Listen on the specified host and port using the bridge server
    this.bridgeServer.listen({ host, port });
    this.logger.info(`Listening on ${host}:${port}`);
    this.setupServerMessageHandling();
  }

  public connect(host: string, port: number): void {
    // Connect to the specified host and port using the bridge client
    this.bridgeClient.connect(host,port);
    this.logger.info(`Connecting to ${host}:${port}`);
    this.setupClientMessageHandling();
  }

  private setupServerMessageHandling(): void {
    this.bridgeServer.onMessage((rawData, uuid) => {
      this.logger.info(`Data received from UUID ${uuid}:`, rawData);
      try {
        const deserializedData = this.dts.deserializeMessage(rawData);
        this.processData(deserializedData);
      } catch (error) {
        this.logger.error('Error in processing data:', error);
      }
    });
  }

  private setupClientMessageHandling(): void {
    // Setup message handling for the bridge client
    // Assuming bridge client has an onMessage method or similar
    this.bridgeClient?.onMessage?.((message: string | Buffer | Buffer[] | ArrayBuffer) => {
      this.logger.info('Message received from server:', message);
      try {
        const deserializedData = this.dts.deserializeMessage(message);
        this.processData(deserializedData);
      } catch (error) {
        this.logger.error('Error in processing client data:', error);
      }
    });
  }

  private processData(data: any): void {
    // Process the data as required
    console.log('Processed Data:', data);
    // Additional processing logic can be added here
  }
}

export default ASSistant;



