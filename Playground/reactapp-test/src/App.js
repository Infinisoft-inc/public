import React from "react";
import { useCreateBrainstack, useBrainStack } from "@brainstack/react";
import Layout from "./devtools/layout";

const App = () => {
  // Create BrainStack instance with options
  const { BrainStackProvider } = useCreateBrainstack({
    eventHubOptions: [],
    stateOptions: { count: 1 },
    loggerOptions: [],
  });

  return (
    <BrainStackProvider>
      {/* <BrainStackApp /> */}
      <Layout />
    </BrainStackProvider>
  );
};

const BrainStackApp = () => {
  const { store, log, useOn } = useBrainStack();

  // Register a handler for the "INCREMENT" event
  useOn("INCREMENT", () => {
    console.log("INCREMENT event received!");
    store.mutate((s) => ({ count: s.count + 1 }));
  });


  log.error(`Hello ${store.getState((s) => s?.count)}`);
  return (
    <div>
      <h1>BrainStack App</h1>
      <p>Current state: {store?.getState((s) => s?.count)}</p>
      <button onClick={() => store.emit("INCREMENT")}>increment</button>
    </div>
  );
};

export default App;
