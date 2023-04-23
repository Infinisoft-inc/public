
class StoreConnector {
  constructor(store, _ws) {
    this.store = store;
    this.ws = _ws

    this.ws.addEventListener('message', (event) => {
      const { eventName, payload } = JSON.parse(event.data);
      store.emit(eventName, payload);
    });

    const originalEmit = store.emit;
    store.emit = (eventName, payload) => {
      originalEmit.call(store, eventName, payload);
      this.ws.send(JSON.stringify({ eventName, payload }));
    };
  }
}

if (typeof module !== 'undefined') {
  module.exports = StoreConnector;
}
