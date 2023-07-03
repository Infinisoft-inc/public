import React from "react";
import { useMicroContext } from "@brainstack/microstore-react";

export const CounterRead = () => {
  const { state } = useMicroContext();

  return (
    <div>
      <h2>{state?.count ?? 0}</h2>
    </div>
  );
};
