
class BackEndStore {
  constructor() {
    this.eventHandlers = new Map();
  }

  on(eventName, handler) {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, []);
    }
    this.eventHandlers.get(eventName).push(handler);
  }

  emit(eventName, payload) {
    const handlers = this.eventHandlers.get(eventName) || [];
    handlers.forEach((handler) => handler(payload));
  }
}

module.exports = BackEndStore;
