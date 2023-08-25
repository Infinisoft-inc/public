# @brainstack/react

@brainstack/react is a library that provides React components and hooks to interact with BrainStack servers.

## Installation

To use @brainstack/react, install it using npm or yarn:

npm install @brainstack/react


or

yarn add @brainstack/react


## Usage

@brainstack/react provides three simple steps to get started with BrainStack:

1. Initialize the connection to the server using `useInitBrainStack()`.  
2. Wrap your components with `BrainStackProvider`.  
3. Consume the context using `useBrainStack()`.  

Here is an example of how to use these functions:

```jsx
import React from "react";
import { useInitBrainStack, BrainStackProvider, useBrainStack } from "@brainstack/react";

const App = () => {
  // Initialize the connection to the server
  useInitBrainStack({ host: "127.0.0.1", port: 3001 });

  // Consume the BrainStack context
  const { state, hub, logger, connect, close, useOn } = useBrainStack();

  // Register a handler for the "INCREMENT" event
  useOn("INCREMENT", () => {
    console.log("INCREMENT event received!");
  });

  return (
    // Wrap your components with BrainStackProvider
    <BrainStackProvider>
      <div>
        <h1>BrainStack App</h1>
        <p>Current state: {state}</p>
        <button onClick={() => connect({ host: "127.0.0.1", port: 3001 })}>Connect</button>
        <button onClick={() => close()}>Disconnect</button>
      </div>
    </BrainStackProvider>
  );
};

const MyComponent = () => {
  const { state, connect, close } = useBrainStack();

  const handleConnect = () => {
    connect({ host: "127.0.0.1", port: 3001 });
  };

  return (
    <div>
      <p>Current state: {state}</p>
      <button onClick={handleConnect}>Connect</button>
      <button onClick={close}>Disconnect</button>
    </div>
  );
};

export default App;
```

# API
**@brainstack/react** provides the following functions:

**useInitBrainStack(options)**: Initializes the connection to the BrainStack server.  
**BrainStackProvider**: Provides a context for the useBrainStack() hook.  
**useBrainStack()**: Consumes the BrainStackContext and provides access to the data. 

## BrainStackContext object
The BrainStackContext object is the context provided by the BrainStackProvider component. It contains the following properties:

**useOn(event: string, handler: Function)**: A function that registers a handler to be called when an event is emitted by the BrainStack client.
**state**: The current state of the BrainStack client.
**hub**: The event hub of the BrainStack client.
**logger**: The logger of the BrainStack client.
**connect(destination: ConnectionConfig)**: A function that establishes a connection with the BrainStack server.
**close()**: A function that closes the connection to the BrainStack server.

# Use Cases
**Real-time collaborative applications**: Use BrainStack to synchronize state between clients in real-time, allowing multiple users to collaborate on the same document or project simultaneously.
  
**Multiplayer games**: Use BrainStack to synchronize game state between clients in real-time, allowing multiple players to participate in the same game at the same time.
  
**Chat applications**: Use BrainStack to synchronize chat messages between clients in real-time, allowing users to chat with each other