# Technical Specifications

## Overview
The addon connects the front-end store with the back-end store for @brainstack/microstore, providing real-time data exchange using WebRTC.

## Front-end
1. Utilize the native WebRTC API for establishing a connection between the front-end store and the back-end store.
2. Establish a WebSocket connection to the back-end for signaling purposes.

## Back-end
1. Use the `wrtc` library to provide WebRTC functionality for the Node.js Express application.
2. Implement a custom WebSocket-based signaling mechanism for bidirectional communication with the front-end store.
3. Ensure compatibility with @brainstack/microstore and that it can be called by a Python module.

## Signaling and Message Format
1. Use WebSockets for bidirectional signaling between the front-end and back-end stores.
2. The message format should include the following fields:
   - Command: Identifying the type of message.
   - Payload: Additional data related to the message.
   - UUID: A unique identifier for each event.
   - Timestamp: The time the message was sent.

## Performance Requirements
1. Ensure low latency to support real-time conversation and video discussion.

## Future Considerations
1. Implement JWT token-based authentication for secure communication.


## @brainstack/microstore API
- `.on(event, handler)`: Subscribe to an event with a handler.
  - `event`: (string | RegExp) The name of the event to subscribe to or a regular expression to match multiple events.
  - `handler`: (function) The callback function to be executed when the event is emitted. The handler receives the current state as input and should return the new state.

- `.emit(event, payload)`: Emit an event with an optional payload.
  - `event`: (string) The name of the event to emit.
  - `payload`: (optional) An additional payload to be passed to the event handlers.

- `.getState()`: Get the current state of the store.
  - Returns: The current state of the store.

- `.mutate(mutator)`: Mutate the state using a mutator function.
  - `mutator`: (function) The mutator function that receives the current state as input and should return the new state.
  - Returns: The new state after mutation.