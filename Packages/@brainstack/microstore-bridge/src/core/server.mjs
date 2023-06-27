import { WebSocket } from "ws";

export const MicroBridgeServer = (store, _ws, options = { reconnectDelayInMs: 5000, loggingEnabled: false, logger: console }) => {
    let ws = _ws;
    const bridgeUuid = uuidv1(); // Generate a unique UUID for the bridge
    

    const start = () => {
        options.logger.info(`Brainstack Core Bridge Server Subscribed to /.*/`);
        store.on(/.*/, (e) => {
            options.logger.info(`Microbridge Subscription /.*/ Called by event: `, e?.data);
            try {
                if (!isBridgeMessage(e, bridgeUuid)) {
                    if (options.loggingEnabled) {
                        options.logger.log(`event: `, e);
                    }
                    const message = addBridgeUuid(e, bridgeUuid);
                    _ws?.send?.(JSON.stringify(message));
                }
            } catch (e) {
                options.logger.error(e);
            }
        });

        // Log MicroBridge server version
        options.logger.log(`Brainstack Core Bridge Server Started`);

        ws.onmessage = (e) => {
            const { eventName = "unknown", payload = {} } = JSON.parse(e.data);
            if (options.loggingEnabled) {
                options.logger.log(`Message Received: `, eventName, e.data);
            }
            if (!isBridgeMessage(eventName, payload, bridgeUuid)) {
                store.emit(eventName, payload);
            }
        };

        ws.onopen = (e) => {
            store.emit("microstore.local.bridge.connected");
        };

        ws.onclose = (e) => {
            store.emit("microstore.local.bridge.disconnected");
        };

        ws.onerror = (e) => {
            store.emit("microstore.local.bridge.error");

            if (ws.readyState === ws.CLOSED) {
                ws = new WebSocket(_ws.url);
            }
        };
    };

    const stop = () => {
        if (ws && ws.readyState === ws.OPEN) {
            ws.close();
        }
        ws = null;
    };

    return {
        stop,
        start
    };
};

// Helper function to check if a message contains the bridge UUID
const isBridgeMessage = (message, bridgeUuid) => (message?.headers ?? []).join("").includes(bridgeUuid);

// Helper function to add the bridge UUID to a message
const addBridgeUuid = (message, bridgeUuid) => {
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
