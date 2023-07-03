#!/bin/bash

# Install create-react-app globally (if not already installed)
npm install -g create-react-app

# Create a new React project
create-react-app microstore-example
cd microstore-example

# Install the @brainstack/microstore-react package
npm install @brainstack/microstore-react

# Replace the contents of src/App.js with the example code
cat > src/App.js <<EOL
import React from 'react';
import { StoreProvider, useMicroStore } from '@brainstack/microstore-react';

const App = () => {
  const initialState = { count: 0 };

  return (
    <StoreProvider initialState={initialState}>
      <div>
        <h1>Counter Example</h1>
        <Counter />
      </div>
    </StoreProvider>
  );
};

const Counter = () => {
  const { state, mutate } = useMicroStore();

  const increment = () => {
    mutate((state) => {
      state.count += 1;
    });
  };

  const decrement = () => {
    mutate((state) => {
      state.count -= 1;
    });
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default App;
EOL

# Start the development server
npm start
