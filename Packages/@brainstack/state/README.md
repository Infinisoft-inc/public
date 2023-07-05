@brainstack/state  
A module for managing application state.

# Installation
To install this module, run the following command:
```bash
npm install @brainstack/state
```
Usage
To use this module, import the createState function and the State interface from the module:
```typescript
import { createState, State } from '@brainstack/state';

interface AppState {
  count: number;
}

const initialState: AppState = {
  count: 0,
};

const state: State<AppState> = createState(initialState);

state.mutate(currentState => {
  return { ...currentState, count: currentState.count + 1 };
});

console.log(state.getState());
```

# API
**createState(initialState: T): State<T>**
Creates a new state instance with the given initial state.

**Arguments**

initialState - The initial state of the application.
**Returns**

A State<T> object with the getState and mutate functions.

**State<T>**
A interface that represents the state management module for managing application state.

**Properties**

getState(selector?: (state: T) => any): any - Retrieves the current state of the application.
selector (optional) - An optional selector function to retrieve a specific value from the state.
mutate(mutator: (currentState: T) => T): T - Mutates the state of the application.
# Contributing
Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository
Create a new branch for your changes
Make your changes and commit them with descriptive commit messages
Push your changes to your fork
Submit a pull request
# License
This module is released under the MIT License.