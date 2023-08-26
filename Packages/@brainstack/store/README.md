# @brainstack/store

A package that combines state management with event handling, providing a convenient solution for managing application state and responding to state changes using event-driven programming.

## Installation

To use @brainstack/store, install it using npm or yarn:

```sh
npm install @brainstack/store
```

or

```sh
yarn add @brainstack/store
```

## Usage

@brainstack/store offers a way to create a microstore that integrates `@brainstack/state` and `@brainstack/hub` libraries to handle state management and event handling.

Here's how you can use @brainstack/store:

```javascript
import { createStore } from '@brainstack/store';

// Create a microstore instance
const microstore = createStore();

// Subscribe to state changes
const unsubscribe = microstore.subscribe((currentState) => {
  console.log('State changed:', currentState);
});

// Update the state using the mutate method
microstore.mutate((currentState) => {
  return { ...currentState, key: 'new value' };
});

// Unsubscribe when done
unsubscribe();
```

## API

### `createStore(options?: TCreateStoreOptions)`

Creates a store instance with integrated state management and event handling.

- `options`: An optional object containing the following properties:
  - `initializer`: A function that initializes the initial state.
  - `eventHubOptions`: Options for configuring the event hub.

#### Store Instance Methods

- `mutate(mutator: (_state: ReturnType<typeof state.getState>) => any)`: Updates the microstore state with a new value and emits a "state.changed" event.

- `subscribe(callback: (_state: ReturnType<typeof state.getState>) => void)`: Subscribes to changes in the microstore state and invokes the provided callback when the state changes.

# Contributing
Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository  
Create a new branch for your changes  
Make your changes and commit them with descriptive commit messages  
Push your changes to your fork  
Submit a pull request  

# License
This module is released under the MIT License.