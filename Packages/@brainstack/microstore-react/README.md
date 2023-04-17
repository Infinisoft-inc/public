# useMicroStore

![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)<br />
![Infinisoft World Inc.](https://pbs.twimg.com/profile_banners/1034959025857851392/1673900508/600x200)

# Synchronous Micro State Management for React Applications

**Incredibly Lightweight**: useMicroStore is a simple, lightweight, and efficient state management solution for React applications. It leverages React's built-in hooks to provide a synchronous and mutable state management system. With an event-driven architecture, useMicroStore allows developers to maintain a clean and organized codebase with minimal boilerplate.

## Features

- Mutable and synchronous state management
- Event-driven architecture with publish-subscribe (pub-sub) pattern
- Easy integration into any React application
- Minimal footprint, optimized for size and performance
- Based on React's built-in hook `useSyncExternalStore`

## Installation

To install the `useMicroStore` package, use the following command:

```bash
npm install @brainstack/microstore-react
```

## Usage

```javascript
import React from 'react';
import { useMicroStore, useOn } from '@brainstack/microstore-react';

const App = () => {

  return (
      <Counter />
  );
};

const Counter = () => {
  const { state, mutate } = useMicroStore();

  useOn("state.changed", (e) => {
    console.log(`State changed`);
  });

  const increment = () => {
    console.log(`incrememnt `);
    mutate({ count: (state?.count ?? 0) + 1 });
  };

  const decrement = () => {
    console.log(`decrememnt `);
    mutate({ count: (state?.count ?? 0) - 1 });
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{state?.count ?? 0}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};


export default App;
```

## API

- `useMicroStore`: A React hook that returns the store's state and methods.
  - `state`: (object) The current state of the store.
  - `mutate`: (function) A function to mutate the state directly. Accepts a mutator function that receives the current state as input and should return the new state.
  - `on`: (function) A function to subscribe to an event with a handler. Accepts a regular expression to match multiple events and a callback function to be executed when the event is emitted.
  - `emit`: (function) A function to emit an event with an optional payload. Accepts the name of the event to emit and an additional payload to be passed to the event handlers.
  - `useOn`: A React hook for subscribing to events in the store. Accepts an event name and a handler function.

## Contributing
Contributions, issues, and feature requests are welcome. Feel free to check the issues page.

## License
This project is licensed under the terms of the MIT License.

## Author
Martin Ouimet mouimet@infinisoft.dev - Infinisoft World Inc. - www.infinisoft.world
The future is now