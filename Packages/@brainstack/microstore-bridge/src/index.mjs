export const microstoreBridge = (store, _ws, options = { reconnectDelayInMs: 5000, logger: console }) => {
  let ws = _ws;
  const bridgeUuid = uuidv1(); // Generate a unique UUID for the bridge

  const start = () => {
    store.on(/.*\.sync\..*/, (e) => {
      try {
        if (!isBridgeMessage(e?.eventName, e, bridgeUuid)) {
          options.logger.log(`event: `, e);
          const message = addBridgeUuid(e, bridgeUuid);
          message.eventName = addMessageBridged(message.eventName)
          _ws?.send?.(JSON.stringify(message));
        }
      } catch (e) {
        console.error(e);
      }
    });

    ws.onmessage = (e) => {
      const { eventName = "unknown", payload = {} } = JSON.parse(e.data);
      options.logger.log(`Message Received: `, eventName, e.data);
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
const isBridgeMessage = (eventName, message, bridgeUuid) => {
  const headers = message?.headers || [];
  return headers.join("").includes(bridgeUuid) || eventName.includes('bridge');
};

// Helper function to add the bridge UUID to a message
const addBridgeUuid = (message, bridgeUuid) => {
  const headers = message?.headers || [];
  const updatedHeaders = [...headers, { uuid: bridgeUuid, timestamp: Date.now() }];
  return { ...message, headers: updatedHeaders };
};

// Helper function to  identify message already bridge avoiding infinite loop
const addMessageBridged = (eventName) => `${eventName}.bridge`

// Generate a UUID
const uuidv1 = () => {
  // Implement your own UUID generation logic here
  // This is just a simple example using a random number
  return Math.random().toString();
};
