import React from "react";
import { useMicroStore, useOn } from "@brainstack/microstore-react";

export const Counter = () => {
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
