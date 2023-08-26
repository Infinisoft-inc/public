import React, { useState } from "react";
import { useCreateBrainstack, useBrainStack } from "@brainstack/react";

const App = () => {
  // Create BrainStack instance with options
  const { BrainStackProvider } = useCreateBrainstack({
    eventHubOptions: [],
    stateOptions: { count: 1 },
    loggerOptions: [],
  });

  return (
    <BrainStackProvider>
      <BrainStackApp />
    </BrainStackProvider>
  );
};

const BrainStackApp = () => {
  const { state, hub, log, useOn } = useBrainStack();

  // Register a handler for the "INCREMENT" event
  useOn("INCREMENT", () => {
    console.log("INCREMENT event received!");
    state.mutate((s) => ({ count: s.count + 1 }));
    setA((a) => a + 1);
  });

  const [a, setA] = useState(1);

  log.error(`Hello ${state?.getState((s) => s?.count)}`);
  return (
    <div>
      <h1>BrainStack App</h1>
      <p>Current state: {state?.getState((s) => s?.count)}</p>
      <button onClick={() => hub.emit("INCREMENT")}>increment</button>
    </div>
  );
};

export default App;
