const fs = require('fs');
const path = require('path');

// Directories to create
const directories = ['project/backend', 'project/frontend', 'project/common'];

// Files and their content
const files = {
  'project/backend/index.js': `
const BackEndStore = require('./store');
const StoreConnector = require('../common/store-connector');

const backEndStore = new BackEndStore();
const backEndConnector = new StoreConnector(backEndStore, 'ws://frontend-url');

backEndStore.emit('example-event', 'Hello from back-end store');
`,
  'project/backend/store.js': `
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
`,
  'project/frontend/index.html': `
<!DOCTYPE html>
<html>
<head>
  <title>WebSocket Frontend</title>
  <script src="store.js"></script>
  <script src="../common/store-connector.js"></script>
</head>
<body>
  <script>
    const frontEndStore = new FrontEndStore();
    const frontEndConnector = new StoreConnector(frontEndStore, 'ws://backend-url');

    frontEndStore.emit('example-event', 'Hello from front-end store');
  </script>
</body>
</html>
`,
  'project/frontend/store.js': `
class FrontEndStore {
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
`,
  'project/common/store-connector.js': `
class StoreConnector {
  constructor(store, url) {
    this.store = store;
    this.ws = new WebSocket(url);

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
`
};

// Create directories
directories.forEach((dir) => {
  fs.mkdirSync(path.resolve(__dirname, dir), { recursive: true });
});

// Create files with content
for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.resolve(__dirname, filePath), content);
}

console.log('Scaffold has been successfully created!');
