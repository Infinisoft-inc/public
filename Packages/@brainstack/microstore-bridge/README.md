# @brainstack/microstore-bridge

![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)<br />
![Infinisoft World Inc.](https://pbs.twimg.com/profile_banners/1034959025857851392/1673900508/600x200)


@brainstack/microstore-bridge is a package that manages WebSocket connections and provides an interface for interacting with a remote store. It simplifies the process of listening for events, sending messages, and handling reconnections.

## Usage

To use @brainstack/micro-bridge, first create a `Store` instance that extends the `EventEmitter` class. This store is used to manage events and their listeners.

Next, create a `WebSocket` instance for the WebSocket server you want to connect to.

Finally, create a `Microbridge` instance with the `Store` and `WebSocket` instances.

Here's an example of how to use the Microbridge class:

```javascript
const EventEmitter = require('events');
class Store extends EventEmitter {}
const WebSocket = require('ws');
const Microbridge = require('@brainstack/micro-bridge');

const store = new Store();
const ws = new WebSocket('ws://localhost:8080');
const microbridge = new Microbridge(store, ws, { reconnectDelayInMs: 5000, logger: console.log });

store.on('example.event', (payload) => console.log('Received:', payload));
store.emit('example.event', { message: 'Hello, World!' });
```

When you're done using the Microbridge instance, call the `destroy()` method to clean up resources:

```javascript
microbridge.destroy();
```

## Constructor Options

The Microbridge constructor accepts an options object with the following properties:

- `reconnectDelayInMs` (default: 5000): The delay in milliseconds for reconnecting to the WebSocket server.
- `logger` (default: console.log): The logger function for logging events.

## Methods

- `stop_heartbeat()`: Stops the heartbeat interval, which is responsible for checking the connection status and reconnecting.
- `start_heartbeat()`: Starts the heartbeat interval.
- `init()`: Initializes the Microbridge instance by setting up event listeners and starting the heartbeat.
- `destroy()`: Cleans up resources by closing the WebSocket connection and stopping the heartbeat.