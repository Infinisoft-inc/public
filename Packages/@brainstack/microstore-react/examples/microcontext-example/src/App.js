import React from "react";
import { Counter } from "./Counter";
import { MicroStoreProvider } from "@brainstack/microstore-react";
import { CounterRead } from "./CounterRead";

const App = () => {
  return (
    <MicroStoreProvider>
      <div>
        <h1>Counter Example</h1>
        <Counter />
        <CounterRead />
      </div>
    </MicroStoreProvider>
  );
};

export default App;
