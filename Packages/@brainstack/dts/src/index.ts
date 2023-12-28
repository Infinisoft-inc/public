import { isJsonString } from './validators/isJsonString';
import { EventHub, createEventHub } from '@brainstack/hub';
import { Logger, createLogger } from '@brainstack/log';

export class DataTransformationService {
  constructor(private hub: EventHub, private log: Logger) {
    // Listen for incoming raw data, deserialize it, and emit it on the hub
    this.hub.on('micro.websocket.rawdata.incoming', (rawData: any) => {
      this.log.verbose('Received raw data:', rawData);
      const deserializedData = this.deserializeMessage(rawData);

      if (deserializedData) {
        this.hub.emit('data.deserialized', deserializedData);
        this.log.verbose('Emitted deserialized data on hub:', deserializedData);
      } else {
        this.log.error('Failed to deserialize data:', rawData);
      }
    });


    // Listen for outgoing data, serialize it, and send it to its destination
    this.hub.on('outgoing', (data: any) => {
      this.log.verbose('Received data for outgoing:', data);
      const serializedData = this.serializeMessage(data);

      if (serializedData) {
        this.hub.emit('meso.dts.rawdata.outgoing',  serializedData)
        this.log.verbose('Serialized and sent data:', serializedData);
      } else {
        this.log.error('Failed to serialize data:', data);
      }
    });
  }

  public serializeMessage(message: any): string {
    this.log.verbose(`Serializing message:`, message);
    return JSON.stringify(message);
  }

  public deserializeMessage(
    data: string | Buffer | Buffer[] | ArrayBuffer,
  ): any | null {
    let jsonData: string;

    if (typeof data === 'string') {
      if (!isJsonString(data)) {
        this.log.error('Invalid JSON string:', data);
        return null;
      }
      jsonData = data;
    } else if (data instanceof Buffer) {
      jsonData = data.toString('utf-8');
    } else if (
      Array.isArray(data) &&
      data.every((element) => element instanceof Buffer)
    ) {
      const combinedBuffer = Buffer.concat(data);
      jsonData = combinedBuffer.toString('utf-8');
    } else if (data instanceof ArrayBuffer) {
      jsonData = new TextDecoder().decode(data);
    } else {
      this.log.error('Received message data in an unsupported format:', data);
      return null;
    }

    try {
      this.log.verbose(`Deserializing message: `, jsonData);
      const message: any = JSON.parse(jsonData);
      return message;
    } catch (error) {
      this.log.error('Error parsing message:', error);
      return null;
    }
  }

}

