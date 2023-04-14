![Infinisoft World Inc.](https://pbs.twimg.com/profile_banners/1034959025857851392/1673900508/600x200)

# @brainstack/microstore

Synchronous Micro State Management for Microapps.

**Incredibly Lightweight**: iBrainMicroStore is astonishingly small, weighing in at just **182 bytes**. A synchronous micro state management library designed for use in microapps. It is one of the pillar foundations of IBrain. The library is meant to be very small and very specific, breaking the boundaries between front-end and back-end, providing a unified hub. Its state is mutable and synchronous, allowing developers to focus on what's important with minimal boilerplate.

## Features

- Mutable and synchronous state management
- Event-driven architecture with publish-subscribe (pub-sub) pattern
- Easy integration into any microapp
- Minimal footprint, optimized for size and performance
- No dependencies

## Installation

To install the @brainstack/microstore package, use the following command:

```bash
npm install @brainstack/microstore
```

## Usage
```javascript
const iBrainMicroStore = require('@brainstack/microstore');

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

## API
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