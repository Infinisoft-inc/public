class Microbridge {
    constructor(store, _ws, options = { reconnectDelayInMs: 5000, logger: console.log }) {
      this.store = store;
      this._ws = _ws;
      this.options = options;
      this.heartbeat = null;
      this.ws = this._ws;
  
      this.stop_heartbeat = this.stop_heartbeat.bind(this);
      this.start_heartbeat = this.start_heartbeat.bind(this);
      this.init = this.init.bind(this);
  
      this.init();
    }
  
    stop_heartbeat() {
      this.store.emit("microstore.bridge.online");
      clearInterval(this.heartbeat);
    }
  
    start_heartbeat() {
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(() => {
        if (this.ws.readyState === this.ws.CLOSED) {
          this.ws = new WebSocket(this._ws.url);
          this.start_heartbeat();
        }
      }, this.options.reconnectDelayInMs);
    }
  
    init() {
      this.store.on(/.*/, (e) => {
        try {
          this.options.logger.log(`event: `, e, this.ws);
          this.ws.send(JSON.stringify(e));
        } catch (e) {
          console.error(e);
        }
      });
  
      this.ws.onmessage = (e) => {
        const { eventName = "unknown", payload = {} } = JSON.parse(e.data);
        this.options.logger.log(`Message Received: `, eventName, payload);
        this.store.emit(eventName, payload);
      };
  
      this.ws.onopen = (e) => {
        this.stop_heartbeat();
      };
  
      this.ws.onclose = (e) => {
        this.store.emit("microstore.bridge.offline");
        this.ws = new WebSocket(this._ws.url);
        this.start_heartbeat();
      };
  
      this.ws.onerror = (e) => {
        this.store.emit("microstore.bridge.offline");
  
        if (this.ws.readyState === this.ws.CLOSED) {
          this.ws = new WebSocket(this._ws.url);
          this.start_heartbeat();
        }
      };
    }
  
    destroy() {
      if (this.ws && this.ws.readyState === this.ws.OPEN) {
        this.ws.close();
      }
      this.ws = null;
      this.stop_heartbeat();
    }
  }
  