import { createEventHub } from '@brainstack/hub';
import {  createLogger } from '@brainstack/log';
import type { BridgeFactoryClient, BridgeFactoryServer } from './abstraction'
import { WebSocket, Server } from "ws";

export const createBridgeClient: BridgeFactoryClient = (
  { hub = createEventHub({
    source: 'unknown',
    logger: createLogger(3)
  }), logger = createLogger(3), ws_client }
) => {
  const bridgeUuid = uuidv1(); // Generate a unique UUID for the bridge
  let ws: WebSocket | undefined = ws_client;

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


export const createBridgeServer: BridgeFactoryServer = (
    {
      hub = createEventHub({
        source: 'unknown',
        logger: createLogger(3)
      }),
      logger = createLogger(3),
      ws_server
    }
  ) => {
    let wss: Server | undefined = ws_server;
  
    const listen = ({ host = "127.0.0.1", port = 8080 }) => {
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
  


// Helper function to check if a message contains the bridge UUID
const isBridgeMessage = (message: any, bridgeUuid: string) =>
    (message?.headers ?? []).join("").includes(bridgeUuid);

// Helper function to add the bridge UUID to a message
const addBridgeUuid = (message: any, bridgeUuid: string) => {
    const headers = message?.headers || [];
    const updatedHeaders = [...headers, { uuid: bridgeUuid, timestamp: Date.now() }];
    return { ...message, headers: updatedHeaders };
};

// Generate a UUID
const uuidv1 = () => {
    // Implement your own UUID generation logic here
    // This is just a simple example using a random number
    return Math.random().toString();
};
