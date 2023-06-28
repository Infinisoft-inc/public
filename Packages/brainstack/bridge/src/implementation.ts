import { createEventHub } from '@brainstack/hub';
import { createLogger } from '@brainstack/log';
import type { BridgeFactoryClient, BridgeFactoryServer, SocketConfig } from './abstraction'
import { WebSocket, Server } from "ws";

/**
 * Creates a bridge client with the provided options.
 * @param options - The options for configuring the bridge client.
 * @returns The created bridge client instance.
 */
export const createBridgeClient: BridgeFactoryClient = (
  { hub = createEventHub({
    source: 'unknown',
    logger: createLogger(3)
  }), logger = createLogger(3), ws_client } = {}
) => {
  const bridgeUuid = uuidv1(); // Generate a unique UUID for the bridge
  let ws: WebSocket | undefined = ws_client;

  /**
 * Connects to the destination socket using the provided configuration.
 * @param host - The host of the destination socket.
 * @param port - The port of the destination socket.
 * @returns The WebSocket instance representing the connection.
 */
  const connect = ({ host = "127.0.0.1", port = 8080 }) => {
    ws = new WebSocket(`ws://${host}:${port}/ws`);

    logger.log(`🧠 Brainstack Bridge Client Connecting to ws://${host}:${port}/ws...`);
    hub.on(/.*/, (e: any) => {
      logger.log(`📞 Brainstack Bridge Client Subscription /.*/ Called by event: `, e?.data);
      try {
        if (!isBridgeMessage(e, bridgeUuid)) {
          logger.log(`🎉event: `, e);
          const message = addBridgeUuid(e, bridgeUuid);
          ws?.send?.(JSON.stringify(message));
        }
      } catch (e) {
        logger.error(e);
      }
    });

    ws.onmessage = (e: any) => {
      const { eventName = "unknown", payload = {} } = JSON.parse(e.data);
      logger.log(`💬Message Received: `, eventName, e.data);
      if (!isBridgeMessage(e, bridgeUuid)) {
        hub.emit(eventName, payload);
      }
    };

    ws.onopen = (e) => {
      hub.emit("🔗bridge.connected");
    };

    ws.onclose = (e) => {
      hub.emit("⚠️bridge.disconnected");
    };

    ws.onerror = (e) => {
      hub.emit("❌bridge.error");

      if (ws?.url && ws?.readyState === ws?.CLOSED) {
        ws = new WebSocket(ws.url);
      }
    };

    return ws;
  };

  /**
   * Closes the bridge client connection.
   */
  const close = () => {
    if (ws && ws.readyState === ws.OPEN) {
      ws.close();
    }
  };

  return {
    connect,
    close,
    hub,
    logger,
    ws_client
  };
};

/**
 * Creates a bridge server with the provided options.
 * @param options - The options for configuring the bridge server.
 * @returns The created bridge server instance.
 */
export const createBridgeServer: BridgeFactoryServer = (
  {
    hub = createEventHub({
      source: 'unknown',
      logger: createLogger(3)
    }),
    logger = createLogger(3),
    ws_server
  } = {}
) => {
  let wss: Server | undefined = ws_server;

  /**
  * Starts listening on the specified socket configuration.
  * @param host - The host for the server.
  * @param port - The port for the server.
  * @returns The WebSocket server instance.
  */
  const listen = (args: SocketConfig | undefined) => {
    const { host, port } = args ?? { host: "127.0.0.1", port: 8080 }
    wss = new Server({ host, port });

    logger.log(`🚀 Brainstack Bridge Server Launched`);

    wss.on("connection", (ws) => {
      logger.log(`🔗 Client connected to Brainstack Bridge Server`);

      ws.on("message", (message) => {
        const { eventName = "unknown", payload = {} } = JSON.parse(message.toString());
        logger.log(`💬 Message Received: `, eventName, message.toString());
        hub.emit(eventName, payload);
      });

      ws.on("close", () => {
        logger.log(`⚠️ Client disconnected from Brainstack Bridge Server`);
      });

      ws.on("error", () => {
        logger.error(`❌ Error occurred in connection with Brainstack Bridge Server`);
      });
    });

    return wss;
  };

  /**
 * Closes the bridge server.
 */
  const close = () => {
    if (wss) {
      wss.close();
    }
  };

  return {
    listen,
    close,
    hub,
    logger,
    ws_server
  };
};


/**
 * Helper function to check if a message contains the bridge UUID.
 * @param message - The message object.
 * @param bridgeUuid - The bridge UUID to check.
 * @returns A boolean indicating if the message contains the bridge UUID.
 */
const isBridgeMessage = (message: any, bridgeUuid: string) =>
  (message?.headers ?? []).join("").includes(bridgeUuid);

// Helper function to add the bridge UUID to a message
const addBridgeUuid = (message: any, bridgeUuid: string) => {
  const headers = message?.headers || [];
  const updatedHeaders = [...headers, { uuid: bridgeUuid, timestamp: Date.now() }];
  return { ...message, headers: updatedHeaders };
};

/**
 * Generate a UUID.
 * @returns A UUID string.
 */
const uuidv1 = () => {
  // Implement your own UUID generation logic here
  // This is just a simple example using a random number
  return Math.random().toString();
};
