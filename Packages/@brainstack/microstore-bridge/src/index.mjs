/**
 * Creates a Microstore bridge instance that connects a Microstore to a WebSocket for real-time communication.
 * @function
 * @param {Object} store - The Microstore instance.
 * @param {WebSocket} _ws - The WebSocket instance.
 * @param {Object} [options] - The options for the Microbridge.
 * @param {number} [options.reconnectDelayInMs=5000] - The delay in milliseconds for reconnecting to the WebSocket server.
 * @param {function} [options.logger=console] - The logger function for logging events.
 * @returns {Object} - An object containing `start` and `stop` functions to control the Microstore bridge.
 *
 * @example
 * const store = createStore();
 * const websocket = new WebSocket("wss://example.com/your-websocket-endpoint");
 * const bridge = microbridge(store, websocket, {
 *   reconnectDelayInMs: 5000,
 *   logger: console,
 * });
 * bridge.start();
 */


// namescape
// /store.scope.source.action/

export const microstoreBridge = (store, _ws, options = { reconnectDelayInMs: 5000, logger: console }) => {
  let ws = _ws;

  const start = () => {
    store.on(/.*\.sync\..*/, (e) => {
      try {
        options.logger.log(`event: `, e);
        ws.send(JSON.stringify(e).replace("sync","remote"));
      } catch (e) {
        console.error(e);
      }
    });

    ws.onmessage = (e) => {
      const { eventName = "unknown", payload = {} } = JSON.parse(e.data);
      options.logger.log(`Message Received: `, eventName, payload);
      store.emit(eventName, payload);
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
  }

  const stop = () => {
    if (ws && ws.readyState === ws.OPEN) {
      ws.close();
    }
    ws = null;
  }

  return {
    stop,
    start
  }
};