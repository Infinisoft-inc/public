# @brainstack/react

`@brainstack/react` is a library that provides React components and hooks to interact with BrainStack.

## Installation

To use `@brainstack/react`, install it using npm or yarn:

```bash
npm install @brainstack/react
```

or

```bash
yarn add @brainstack/react
```

## Usage

`@brainstack/react` offers a seamless integration with BrainStack using the following steps:

1. **Create BrainStack Instances**: Utilize the `createBrainstack` function to create a BrainStack instance with customizable options. This function returns the `BrainStackProvider` and the `useBrainStack()` hook.

2. **Wrap with `BrainStackProvider`**: Wrap your application or relevant components with the `BrainStackProvider` to provide the necessary context for the `useBrainStack()` hook.

3. **Consume the Context**: Utilize the `useBrainStack()` hook within a component that is a child of the appropriate `BrainStackProvider` to access the BrainStack context and interact with its features.

Here's an example of how to use these functions:

```jsx
import React from 'react';
import { createBrainstack } from '@brainstack/react';

// Create BrainStack instance with options
const options = {
  eventHubOptions: [],
  stateOptions: { count: 1 },
  loggerOptions: [],
  authIntegration: {
    // ... authentication integration settings ...
  },
};

const { BrainStackProvider, useBrainStack } = createBrainstack(options);

const App = () => {
  return (
    <BrainStackProvider>
      <BrainStackApp />
    </BrainStackProvider>
  );
};

const BrainStackApp = () => {
  const { store, log, useOn } = useBrainStack();

  // Register a handler for the "INCREMENT" event
  useOn('INCREMENT', () => {
    console.log('INCREMENT event received!');
    store.mutate((s) => ({ count: s.count + 1 }));
  });

  log.error(`Hello ${store.getState((s) => s?.count)}`);
  return (
    <div>
      <h1>BrainStack App</h1>
      <p>Current state: {store?.getState((s) => s?.count)}</p>
      <button onClick={() => store.emit('INCREMENT')}>increment</button>
    </div>
  );
};

export default App;
```

## API

`@brainstack/react` provides the following functions:

- **createBrainstack(options)**: Create a BrainStack instance with customizable options. This function returns the `BrainStackProvider` and the `useBrainStack()` hook.
- **BrainStackProvider**: Wrap components to provide the context for `useBrainStack()`.
- **useBrainStack()**: Consume the BrainStackContext and access its properties.

### BrainStackContext Object

The BrainStackContext object, provided by the appropriate `BrainStackProvider`, contains the following properties:

- **useOn(event: string, handler: Function)**: Register a handler to be called when an event is emitted by the BrainStack client.
- **store**: Hub and state.
- **log**: The logger of the BrainStack client.

## Use Cases

- **Real-time Collaborative Applications**: Facilitate real-time collaboration among users working on shared documents or projects.

- **Multiplayer Games**: Enable real-time synchronization of game state for multiplayer gaming experiences.

- **Chat Applications**: Support real-time chat messaging between users in a chat application.

# Contributing

Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository  
Create a new branch for your changes  
Make your changes and commit them with descriptive commit messages  
Push your changes to your fork  
Submit a pull request

# License

This module is released under the MIT License.
