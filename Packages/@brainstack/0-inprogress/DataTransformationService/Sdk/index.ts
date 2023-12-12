import { WebSocketMessage } from "../../Data/Models";
import { isJsonString } from "../Validators/isJsonString";
import { coreServices } from "../../Brainstack";

const hub = coreServices.hub;

export class DataTransformationService {
  constructor() {
    hub.on("new.data", this.handleIncomingMessage);
  }

  public serializeMessage(message: WebSocketMessage): string {
    coreServices.log.verbose(`Serializing message:`, message);
    return JSON.stringify(message);
  }

  public deserializeMessage(
    data: string | Buffer | Buffer[] | ArrayBuffer
  ): WebSocketMessage | null {
    let jsonData: string;

    if (typeof data === "string") {
      if (!isJsonString(data)) {
        return null;
      }
      jsonData = data;
    } else if (data instanceof Buffer) {
      jsonData = data.toString("utf-8");
    } else if (
      Array.isArray(data) &&
      data.every((element) => element instanceof Buffer)
    ) {
      // If 'data' is an array of Buffers, concatenate them into a single Buffer
      const combinedBuffer = Buffer.concat(data);
      jsonData = combinedBuffer.toString("utf-8");
    } else if (data instanceof ArrayBuffer) {
      // If 'data' is an ArrayBuffer, convert it to a string
      jsonData = new TextDecoder().decode(data);
    } else {
      coreServices.log.error(
        "Received message data in an unsupported format:",
        data
      );
      return null;
    }

    try {
      coreServices.log.verbose(`Deserializing message: `, jsonData);
      const message: WebSocketMessage = JSON.parse(jsonData);
      return message;
    } catch (error) {
      coreServices.log.error("Error parsing message:", error);
      return null;
    }
  }

  public handleIncomingMessage(data: Buffer | ArrayBuffer | string): void {
    coreServices.log.verbose(
      `handleIncomingMessage received data of type: ${typeof data}`
    );

    let message: WebSocketMessage | null = this.deserializeMessage(data);

    if (message) {
      hub.emit(message.action, message);
      coreServices.log.verbose(message.action, message);
    }
  }
}


