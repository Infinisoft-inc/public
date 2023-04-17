// scaffold.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const writeFile = (filePath, content) => {
  fs.writeFileSync(filePath, content);
};

const executeCommand = (command) => {
  execSync(command, { stdio: 'inherit' });
};

// Create project directory
const projectDir = 'ibrain-state-package';
createDir(projectDir);

// Change to project directory
process.chdir(projectDir);

// Initialize npm package
executeCommand('npm init -y');

// Install dependencies
executeCommand('npm install react react-dom');

// Create src directory
createDir('src');

// Write iBrainState.js
writeFile(
  path.join('src', 'iBrainState.js'),
  `
export const iBrainState = (initialState) => {
  let state = initialState;
  const getState = () => state;
  const mutate = (newState) => {
    state = newState;
    return state;
  };
  return { getState, mutate };
};

export const iBrainHub = () => {
  const events = new Map();
  const on = (eventName, handler) => {
    const id = Symbol(handler);
    const handlers = events.get(eventName) ?? new Map();
    handlers.set(id, handler);
    events.set(eventName, handlers);
    return () => handlers.delete(id);
  };
  const emit = (eventName, payload) => {
    const handlers = events.get(eventName);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  };
  return { on, emit };
};

export const iBrainMicroStore = (initialState) => {
  const { getState, mutate } = iBrainState(initialState);
  const { on, emit } = iBrainHub();
  return { getState, mutate, on, emit };
};
`
);

// Write useSyncExternalStoreWithIBrain.js
writeFile(
  path.join('src', 'useSyncExternalStoreWithIBrain.js'),
  `
import {
  useSyncExternalStore,
  createContext,
  useContext,
} from 'react';
import { iBrainMicroStore } from './iBrainState';

const StoreContext = createContext();

export const StoreProvider = ({ children, initialState }) => {
  const store = iBrainMicroStore(initialState);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useSyncExternalStoreWithIBrain = () => {
  const { getState, mutate, on, emit } = useContext(StoreContext);

  const subscribe = (callback) => {
    const unsubscribe = on(/.*/, () => {
      callback();
    });
    return () => {
      unsubscribe();
    };
  };

  const state = useSyncExternalStore(subscribe, getState);

  return { state, mutate, on, emit };
};
`
);

console.log(`Scaffolded package in ${projectDir}`);
