# @brainstack/microstore

![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)<br />
![Infinisoft World Inc.](https://pbs.twimg.com/profile_banners/1034959025857851392/1673900508/600x200)


# Synchronous Micro State Management for Microapps.

**Incredibly Lightweight**: iBrainMicroStore is astonishingly small, weighing in at just **182 bytes**. A synchronous micro state management library designed for use in microapps. It is one of the pillar foundations of IBrain. The library is meant to be very small and very specific, breaking the boundaries between front-end and back-end, providing a unified hub. Its state is mutable and synchronous, allowing developers to focus on what's important with minimal boilerplate.

iBrainMicroStore is also available for React applications through the `@brainstack/microstore-react` package. To learn more, visit: https://www.npmjs.com/package/@brainstack/microstore-react

## Features

- Mutable and synchronous state management
- Event-driven architecture with publish-subscribe (pub-sub) pattern
- Real-time communication for seamless state management
- Easy integration into any microapp
- React support available via `@brainstack/microstore-react`
- Minimal footprint, optimized for size and performance
- No dependencies

## Installation

To install the @brainstack/microstore package, use the following command:

```bash
npm install @brainstack/microstore
```

## Usage
```javascript
import {iBrainMicroStore} from '@brainstack/microstore';

// Create a store with an initial state
const store = iBrainMicroStore({ count: 0 });

// Subscribe to an event
store.on('increment', (state) => {
  return { ...state, count: state.count + 1 };
});

// Emit an event
store.emit('increment');

// Get the current state
console.log(store.getState()); // Output: { count: 1 }

// Mutate the state directly
store.mutate((state) => ({ ...state, count: 10 }));

// Get the updated state
console.log(store.getState()); // Output: { count: 10 }
```

You can subscribe to events in the hub using the `on` function and emit events using the `emit` function. Here are some examples:

```javascript
// subscribing to an event named "userLoggedIn"
const removeHandler = on("userLoggedIn", (eventData) => {
  console.log(`User logged in: ${eventData.username}`);
});

// later on, removing the handler from the subscribed event
removeHandler();
```

```javascript
// subscribing to an event with a regular expression pattern "^user.*"
const removeHandler = on(/^user.*/, (eventData) => {
  console.log(`User event: ${eventData.eventName} Scope: `, eventData?.scope ?? "unknown");
});

// emitting events that match the subscribed pattern
emit("userLoggedIn", {scope: "read"});
emit("userRegistered");
emit("adminLoggedIn", {scope: "rw"}); // does not match the pattern

// later on, removing the handler from the subscribed event
removeHandler();
```


## API

The main export of the library is the `iBrainMicroStore` function.

## iBrainMicroStore(initialState, [options={ id: "microstore" }])

This function creates a new store.

**Parameters:**

- `initialState` {Object} - The initial state of the store.
- `options` {Object} - Optional. The options for the store.
  - `options.id` {string} - Optional. The ID of the store. Default is "microstore".

**Returns:**

- {Object} - The created micro store.
  - `.getState` {Function} - Function to get the current state of the store.
  - `.mutate` {Function} - Function to mutate the state of the store.
  - `.on` {Function} - Function to add an event listener.
  - `.emit` {Function} - Function to emit an event.
  - `.id` {string} - The ID of the store.

**Example:**

```javascript
const store = iBrainMicroStore({ count: 0 }, { id: "counterStore" });
store.mutate((state) => ({ count: state.count + 1 }));
console.log(store.getState()); // { count: 1 }

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

## Contributing
Contributions, issues, and feature requests are welcome. Feel free to check the issues page.

## License
This project is licensed under the terms of the MIT License.

## Author
Martin Ouimet mouimet@infinisoft.dev - Infinisoft World Inc. - www.infinisoft.world
The future is now