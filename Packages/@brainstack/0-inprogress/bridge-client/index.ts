import WebSocket from "ws";
// Assuming you have a similar logging setup as @brainstack/log
import { createLogger } from "@brainstack/log";
import readline from "readline";
import { DataTransformationService } from "../DataTransformationService/Sdk";

type TConnectOptions = {
  url: string;
};

class WebSocketClient {
  private ws?: WebSocket;
  private logger = createLogger(5);
  private readonly RECONNECT_INTERVAL = 5000; // 5 seconds for reconnect interval
  private url: string;
  private rl:any;

  constructor() {
    this.url = "";
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // new DataTransformationService()
  }

  public connect({ url }: TConnectOptions) {
    this.url = url;
    this.logger.verbose(`Attempting to connect to ${this.url}`);
    this.ws = new WebSocket(url);

    this.ws.on("open", this.handleOpen.bind(this));
    this.ws.on("close", this.handleClose.bind(this));
    this.ws.on("message", this.handleMessage.bind(this));
    this.ws.on("error", this.handleError.bind(this));
    this.ws.on("pong", this.handlePong.bind(this));
  }

  private handleOpen() {
    this.logger.info("Connected to the WebSocket server.");
    this.promptForMessage();
  }

  private promptForMessage() {
    this.rl.question("Enter your message: ", (message:any) => {
      if (message === "exit") {
        this?.ws?.close();
      } else {
        this?.ws?.send(message);
        this.promptForMessage();
      }
    });
  }

  private handleClose() {
    this.logger.info("Disconnected from WebSocket server.");
    // Attempt to reconnect after a timeout
    setTimeout(() => this.connect({ url: this.url }), this.RECONNECT_INTERVAL);
  }

  private handleMessage(message: string) {
    this.logger.verbose(`Received message from server: ${message}`);
    // Handle incoming messages here
  }

  private handleError(error: Event) {
    this.logger.error("WebSocket error:", error);
  }

  private handlePong() {
    this.logger.verbose("Received pong from server - connection is alive.");
  }

  public send(
    data: string | ArrayBuffer | SharedArrayBuffer | ArrayBufferView
  ) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.logger.verbose(`Sending data to the server: ${data}`);
      this.ws.send(data);
    } else {
      this.logger.warn("WebSocket is not open. Message not sent.");
    }
  }

  public close() {
    this.logger.info("Closing WebSocket connection.");
    this.ws?.close(1000, "Client is closing the connection.");
  }
}

// Usage example
// Replace 'ws://localhost:3000' with your actual WebSocket server URL
// const client = new WebSocketClient('ws://localhost:3000');

const d = new WebSocketClient();
d.connect({ url: "ws://127.0.0.1:10001" });
