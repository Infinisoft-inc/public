import { WebSocket } from "ws";

export const MicroBridgeClient = (store, _ws, options = { reconnectDelayInMs: 5000, loggingEnabled: false, logger: console }) => {
    let heartbeat;
    let ws = _ws;

    const stopHeartbeat = () => {
        store.emit("microstore.bridge.online");
        clearInterval(heartbeat);
    };

    const startHeartbeat = () => {
        clearInterval(heartbeat);
        if (ws.readyState === ws.CLOSED) {
            ws = new WebSocket("ws://127.0.0.1:8080/");
        }

        if (ws.readyState === ws.OPEN) {
            stopHeartbeat();
        }
    };

    const start = () => {
        startHeartbeat();

        // Log MicroBridge client version
        options.logger.log(`MicroBridge client`);

        store.on(/.*/, (e) => {
            try {
                if (options.loggingEnabled) {
                    options.logger.log(`event: `, e);
                }
                ws?.send(JSON.stringify(e));
            } catch (e) {
                console.error(e);
            }
        });

        ws.onmessage = (e) => {
            const { eventName = "unknown", ...payload } = JSON.parse(e.data);
            if (options.loggingEnabled) {
                options.logger.log(`Message Received: `, eventName, payload);
            }
            store.emit(eventName, payload);
        };
        

        ws.onopen = (e) => {
            stopHeartbeat();
        };

        ws.onclose = (e) => {
            store.emit("microstore.bridge.offline");
            startHeartbeat();
        };

        ws.onerror = (e) => {
            store.emit("microstore.bridge.offline");
            startHeartbeat();
        };
    };

    const stop = () => {
        if (ws && ws?.readyState === ws?.OPEN) {
            ws.close();
        }
        ws = null;
        stopHeartbeat();
    };

    return { start, stop };
};
