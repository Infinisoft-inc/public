
# Microstore Bridge

![Infinisoft World Inc.](https://pbs.twimg.com/profile_banners/1034959025857851392/1673900508/600x200)

Microstore Bridge is a practical JavaScript library that simplifies the connection between your frontend and backend applications. By integrating Microstore with WebSockets, it enables real-time communication and data synchronization, allowing you to build responsive and interactive applications with greater ease.

Eliminate the need for repetitive boilerplate code associated with fetch or axios, and shift your focus towards creating exceptional user experiences and interactions.

## Installation

```
npm install --save @brainstack/microstore-bridge
```

## Usage

Here's a basic example of using Microstore Bridge to connect a Microstore instance to a WebSocket:

```javascript
import { createStore } from "@brainstack/microstore";
import { microbridge } from "@brainstack/microstore-bridge";

// Create a Microstore instance
const store = createStore();

// Create a WebSocket instance
const websocket = new WebSocket("wss://example.com/your-websocket-endpoint");

// Initialize Microbridge with the Microstore and WebSocket instances
const bridge = microbridge(store, websocket, {
  reconnectDelayInMs: 5000,
  logger: console,
});

// Start the Microbridge
bridge.start();

// ... your application logic ...

// Stop the Microbridge when it's no longer needed
bridge.stop();
```

## Configuration Options

The `microbridge` function accepts an optional configuration object with the following properties:

- `reconnectDelayInMs`: The delay in milliseconds for reconnecting to the WebSocket server. Defaults to 5000 (5 seconds).
- `logger`: The logger function for logging events. Defaults to the `console` object.

Example of custom configuration:

```javascript
const bridge = microbridge(store, websocket, {
  reconnectDelayInMs: 10000, // Reconnect every 10 seconds
  logger: customLogger, // Use a custom logger function
});
```

## Events

The Microstore Bridge emits several events through the connected Microstore instance:

- `microstore.bridge.connected`: Emitted when the WebSocket connection is successfully established.
- `microstore.bridge.disconnected`: Emitted when the WebSocket connection is closed.
- `microstore.bridge.error`: Emitted when an error occurs with the WebSocket connection.

You can listen to these events in your application:

```javascript
store.on("microstore.bridge.connected", () => {
  console.log("WebSocket connected");
});

store.on("microstore.bridge.disconnected", () => {
  console.log("WebSocket disconnected");
});

store.on("microstore.bridge.error", () => {
  console.log("WebSocket error");
});
```

## Sending and Receiving Events

When the Microstore emits an event, the Microstore Bridge sends the event data through the connected WebSocket as a JSON string. The receiving side can parse the JSON string and process the event accordingly.

Similarly, when the Microstore Bridge receives a message through the WebSocket, it emits the corresponding event through the connected Microstore. Your application can listen to these events and update its state accordingly.