import React from "react";
import { Counter } from "./Counter";
import { MicroStoreProvider } from "@brainstack/microstore-react";
import { CounterRead } from "./CounterRead";
import { WidgetManager } from './WidgetManager';

const App = () => {
  return (
    <MicroStoreProvider>
      <WidgetManager>
      <div>
 
        <h1>Counter Example</h1>
        <Counter />
        <CounterRead />
      </div>
    </WidgetManager>
    </MicroStoreProvider>

  );
};

export default App;
