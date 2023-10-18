# @brainstack/react

`@brainstack/react` is a powerful library designed to simplify state management in React applications and enhance real-time collaboration features. This library provides React components and hooks that seamlessly interact with BrainStack, making it easier to manage and share state across components.

## Installation

To integrate `@brainstack/react` into your project, you can install it using npm or yarn:

```bash
npm install @brainstack/react
```

or

```bash
yarn add @brainstack/react
```

## Usage

`@brainstack/react` offers a straightforward integration process with BrainStack, involving the following steps:

1. **Create BrainStack Instances**: Utilize the `createBrainstack` function to establish a BrainStack instance tailored to your needs. This function provides the `BrainStackProvider` component and the `useBrainStack()` hook for your application.

2. **Wrap with `BrainStackProvider`**: Wrap your application or relevant components with the `BrainStackProvider`. This step is essential to provide the necessary context for the `useBrainStack()` hook.

3. **Consume the Context**: Inside any component that resides under the `BrainStackProvider`, you can use the `useBrainStack()` hook to access the BrainStack context and interact with its features.

Let's explore how these functions work in a simple example:

```jsx
import React from 'react';
import { createBrainstack } from '@brainstack/react';

// Create a BrainStack instance with customized options
const options = {
  eventHubOptions: [],  // Custom event hub options
  stateOptions: { count: 1 },  // Custom state initialization options
  loggerOptions: [5],  // Custom logger options to get verbose logs
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
  const { store, log, useOn, createEventHandlerMutator, getValue } = useBrainStack();

  // Register a handler for the "INCREMENT" event
  useOn('INCREMENT', () => {
    log.info('INCREMENT event received!');
    store.mutate((s) => ({ count: s.count + 1 }));
  });

  log.error(`Hello ${getValue('user.name')}`);
  return (
    <div>
      <h1>BrainStack App</h1>
      <p>Current state: {getValue('count')}</p>
      <input type="text" onChange={createEventHandlerMutator('user.name')} />
      <button onClick={() => store.emit('INCREMENT')}>Increment</button>
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
- **createEventHandlerMutator(fieldPath: string)**: Create a function to mutate deeply nested fields in the state.
- **getValue(fieldPath: string)**: Retrieve a value from a deeply nested state object.

### Additional Functions

#### getValue(fieldPath: string): any

`getValue` is a function that retrieves a value from the deeply nested state object using a dot-separated path to the desired field. This can be useful for accessing specific properties in the state.

```jsx
const username = getValue('user.name');
```

#### createEventHandlerMutator(fieldPath: string): React.ChangeEventHandler\<HTMLInputElement\>

`createEventHandlerMutator` is a function that creates an event handler for input elements, allowing you to easily mutate deeply nested fields in the state object. It takes a dot-separated `fieldPath` as a parameter and returns a function that mutates the specified field when called.

```jsx
const nameMutator = createEventHandlerMutator('user.name');
// In a component:
<input type="text" onChange={nameMutator} />
```

#### createEventHandlerMutatorShallow(fieldPath: string)

`createEventHandlerMutatorShallow` is a function that constructs an event handler to mutate fields in the state object. The `onChange` event must pass new value directly as argument. The function accepts a dot-separated `fieldPath` and returns a mutator function that sets the state for the specified field when invoked.

```jsx
const nameMutator = createEventHandlerMutatorShallow('user.name');
// In a component:
<Component type="text" onChange={nameMutator} />
```

#### createDeepFieldMutator\<T\>(fieldPath: string): DeepFieldMutator\<T\>

`createDeepFieldMutator` is a function that generates a deep field mutator for a specific field in the

 state object. It is useful for directly mutating deeply nested fields within the state.

```jsx
const fieldMutator = createDeepFieldMutator<MyState>('user.name');
const newState = fieldMutator('John')(prevState);
```

**You can use these functions to easily access and modify deeply nested fields in your application's state.**

## Use Cases

`@brainstack/react` is designed to address various use cases, including but not limited to:

- **Real-time Collaborative Applications**: Facilitate real-time collaboration among users working on shared documents or projects.

- **Multiplayer Games**: Enable real-time synchronization of game state for multiplayer gaming experiences.

- **Chat Applications**: Support real-time chat messaging between users in a chat application.

# Contributing

Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

- Fork the repository.
- Create a new branch for your changes.
- Make your changes and commit them with descriptive commit messages.
- Push your changes to your fork.
- Submit a pull request.

# License

This module is released under the MIT License.
