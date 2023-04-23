
const BackEndStore = require('./store');
const StoreConnector = require('../common/store-connector');

const backEndStore = new BackEndStore();
const backEndConnector = new StoreConnector(backEndStore, 'ws://frontend-url');

backEndStore.emit('example-event', 'Hello from back-end store');
