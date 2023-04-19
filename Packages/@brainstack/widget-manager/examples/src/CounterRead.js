import React from "react";
import { useMicroContext } from "@brainstack/microstore-react";

const Todo = () => <h1>Todo</h1>

export const CounterRead = () => {
  const { state,emit } = useMicroContext();

  const addWidget = (event, widgetMeta) => {
    emit('widget.add', { event, widgetMeta });
  };

  return (
    <div>
      <h2>{state?.count ?? 0}</h2>
      <button onClick={() => addWidget('my_widget', { id: 1, title: 'My Widget', component: Todo, context: {} })}>Add Widget</button>
    </div>
  );
};
