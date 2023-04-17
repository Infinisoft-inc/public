import React from "react";
import { iBrainMicroStore } from "@brainstack/microstore";

const createUseMicroStore = (_store) => () => {
  const subscribe = (callback) => {
    return _store.on("state.changed", callback);
  };

  const state = React.useSyncExternalStore(subscribe, store.getState);

  const mutate = (val) => {
    _store.mutate(val);
    _store.emit("state.changed", val);
  };

  return {
    state,
    mutate,
    getState: _store.getState,
    on: _store.on,
    emit: _store.emit,
  };
};

export const store = iBrainMicroStore();
export const useMicroStore = createUseMicroStore(store);
export const useOn = (event, handler) => {
  React.useEffect(() => {
    return store.on(event, handler);
  }, []);
};
