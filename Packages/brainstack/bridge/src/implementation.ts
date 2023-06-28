import  type {MicroBridgeServer} from './abstraction'
import { WebSocket } from "ws";


export const createMicroBridgeServer: MicroBridgeServer = (
    { hub, logger, ws }
) => {
    const bridgeUuid = uuidv1(); // Generate a unique UUID for the bridge

    const start = () => {
        logger.log(`Brainstack Core Bridge Server Subscribed to /.*/`);
        hub.on(/.*/, (e: any) => {
            logger.log(`Microbridge Subscription /.*/ Called by event: `, e?.data);
            try {
                if (!isBridgeMessage(e, bridgeUuid)) {
                    logger.log(`event: `, e);
                    const message = addBridgeUuid(e, bridgeUuid);
                    ws?.send?.(JSON.stringify(message));
                }
            } catch (e) {
                logger.error(e);
            }
        });

        // Log MicroBridge server version
        logger.log(`Brainstack Core Bridge Server Started`);

        ws.onmessage = (e: any) => {
            const { eventName = "unknown", payload = {} } = JSON.parse(e.data);
            logger.log(`Message Received: `, eventName, e.data);
            if (!isBridgeMessage(e, bridgeUuid)) {
                hub.emit(eventName, payload);
            }
        };

        ws.onopen = (e) => {
            hub.emit("microstore.local.bridge.connected");
        };

        ws.onclose = (e) => {
            hub.emit("microstore.local.bridge.disconnected");
        };

        ws.onerror = (e) => {
            hub.emit("microstore.local.bridge.error");

            if (ws.readyState === ws.CLOSED) {
                ws = new WebSocket(ws.url);
            }
        };
    };

    const stop = () => {
        if (ws && ws.readyState === ws.OPEN) {
            ws.close();
        }
    };

    return {
        stop,
        start,
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
