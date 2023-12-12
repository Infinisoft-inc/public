import WebSocket, { Server as WebSocketServer } from "ws";
import { createLogger, Logger } from "@brainstack/log";
import { EventHub } from "@brainstack/hub";

export class BridgeServer {
  private wss: WebSocketServer;
  private logger: Logger;
  private hub: EventHub;

  constructor(port: number, logger: Logger, _hub: EventHub) {
    this.wss = new WebSocketServer({ port });
    this.logger = logger;
    this.hub = _hub;

    this.wss.on("connection", this.handleConnection.bind(this));
    this.wss.on("error", this.handleError.bind(this));

    setInterval(this.pingClients.bind(this), 30000);

    process.on("SIGINT", this.gracefulShutdown.bind(this));
    process.on("SIGTERM", this.gracefulShutdown.bind(this));
  }

  private handleConnection(socket: WebSocket & {isAlive?:boolean}) {
    this.logger.verbose("New WebSocket connection established.");

    socket.isAlive = true; // Mark as alive upon connection
    socket.on("message", (data:any) => this.handleMessage(data, socket));
    socket.on("pong", () => (socket.isAlive = true));
    socket.on("close", () => this.handleClose(socket));
    socket.on("error", (error) => this.handleError(error, socket));
  }

  private handleMessage(message: string, socket: WebSocket) {
    this.logger.verbose(`Received message: ${message}`);
    // Process the message, then route or emit as needed
    this.hub.emit("new.data", { data: message });
  }

  private handleClose(socket: WebSocket) {
    this.logger.info("WebSocket connection closed.");
  }

  private handleError(error: Error, socket: WebSocket) {
    this.logger.error("WebSocket error:", error);
    if (socket.readyState === WebSocket.OPEN) {
      socket.close(1011, "Internal server error");
    }
  }

  private pingClients() {
    this.wss.clients.forEach((client: WebSocket&{isAlive?:boolean}) => {
      if (!client.isAlive) return client.terminate();
      client.isAlive = false; // Reset for the next ping cycle
      client.ping();
    });
  }

  public gracefulShutdown() {
    this.logger.info("Starting graceful shutdown of the BridgeServer.");
    this.wss.close(() => {
      this.logger.info("All connections closed, shutting down server.");
      process.exit(0);
    });
  }
}
