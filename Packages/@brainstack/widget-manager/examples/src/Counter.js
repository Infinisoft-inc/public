import React from "react";
import { useMicroContext } from "@brainstack/microstore-react";

export const Counter = () => {
  const { state, mutate, useOn, emit } = useMicroContext();

  useOn("state.changed", (e) => {
    console.log(`State changed`, e);
  });

  const increment = () => {
    console.log(`incrememnt `);
    mutate({ count: (state?.count ?? 0) + 1 });
  };

  const decrement = () => {
    console.log(`decrememnt `);
    mutate({ count: (state?.count ?? 0) - 1 });
  };

  const addWidget = (event, widgetMeta) => {
    emit('widget.add', { event, widgetMeta });
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{state?.count ?? 0}</span>
      <button onClick={increment}>+</button>

      <button onClick={() => addWidget('my_widget', { id: 1, title: 'My Widget', component: Counter, context: {} })}>Add Widget</button>
    </div>
  );
};
