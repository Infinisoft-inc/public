
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

Semantic annotation is a process in which an annotator (human or machine) associates specific pieces of text with metadata describing the meanings, properties, or relationships represented by those pieces of text. The goal is to enrich the text with additional information that enables more precise processing, understanding, and categorization by computational systems.

An "event" in the context of software systems typically refers to a state change. An event store is a type of database optimized for storing these state changes as a series of events, which can be queried or replayed to understand or recreate the state of the system at any given point in time.

The term `store_id.scope.source.action` in the context of an event store and semantic annotation refers to a specific sequence of properties or relationships within an event:

- `store_id`: Likely refers to the event store itself, where events are being stored.
- `scope`: Refers to the context or the boundary within which the event is happening. This might be a specific part of the system, a particular module or service, or some other defined context.
- `source`: Likely refers to the origin of the event. This could be a specific component or actor in the system that triggered the event.
- `action`: Likely refers to what actually happened - the state change that constitutes the event itself. This might be represented as a verb or a verb phrase.

The semantic annotation of this term would involve attaching metadata to each part of this term (`store`, `scope`, `source`, `action`) that describes what each part means in the specific context of your system. This could enable more precise querying, processing, or analysis of the events in your event store.

In the context of an event store, `scope` can be seen as a descriptor that signifies where and how an event is happening. It can have the following values:

- `local`: If the scope is local, it implies that the event is occurring within the local system or environment. This might be a specific component or service within your system.
- `remote`: A remote scope suggests that the event is taking place outside of the local system, such as on a remote server or external system. This might involve communication over a network, with considerations around latency, reliability, and security.
- `sync`: If the scope is sync, it might mean that the event is part of a synchronization process. This could involve coordinating state between different parts of a system, or between different systems, to ensure consistency. This might happen locally (within the same system) or remotely (between different systems). 

> It is important to note, event are sync once. The string `sync` is replaced by `local` after forarding to avoid circlular infinite event loops  

Thus, `scope` in `store.scope.source.action` refers to the domain or location of the event within the broader system, which can be either 'local', 'remote', or 'sync'. This aids in more precise processing and understanding of the events stored in your event store.

The Microstore Bridge emits several events through the connected Microstore instance:

- `microstore.local.bridge.connected`: Emitted when the WebSocket connection is successfully established.
- `microstore.local.bridge.disconnected`: Emitted when the WebSocket connection is closed.
- `microstore.local.bridge.error`: Emitted when an error occurs with the WebSocket connection.

You can listen to these events in your application:

```javascript
store.on("microstore.local.bridge.connected", () => {
  console.log("WebSocket connected");
});

store.on("microstore.local.bridge.disconnected", () => {
  console.log("WebSocket disconnected");
});

store.on("microstore.local.bridge.error", () => {
  console.log("WebSocket error");
});
```

## Sending and Receiving Events

When the Microstore emits an event, the Microstore Bridge sends the event data through the connected WebSocket as a JSON string. The receiving side can parse the JSON string and process the event accordingly.

Similarly, when the Microstore Bridge receives a message through the WebSocket, it emits the corresponding event through the connected Microstore. Your application can listen to these events and update its state accordingly.