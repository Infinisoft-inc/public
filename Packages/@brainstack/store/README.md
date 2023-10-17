# @brainstack/store

A package that combines state management with event handling, providing a convenient solution for managing application state and responding to state changes using event-driven programming.

## Installation

To use @brainstack/store, install it using npm or yarn:

```sh
npm install @brainstack/store
```

or

```sh
yarn add @brainstack/store
```

## Usage

@brainstack/store offers a way to create a microstore that integrates `@brainstack/state` and `@brainstack/hub` libraries to handle state management and event handling.

Here's how you can use @brainstack/store:

```javascript
import { createStore } from '@brainstack/store';

// Create a microstore instance
const microstore = createStore();

// Subscribe to state changes
const unsubscribe = microstore.subscribe((currentState) => {
  console.log('State changed:', currentState);
});

// Update the state using the mutate method
microstore.mutate((currentState) => {
  return { ...currentState, key: 'new value' };
});

// Unsubscribe when done
unsubscribe();
```

## API

### `createStore(options?: TCreateStoreOptions)`

Creates a store instance with integrated state management and event handling.

- `options`: An optional object containing the following properties:
  - `initializer`: A function that initializes the initial state.
  - `eventHubOptions`: Options for configuring the event hub.

#### Store Instance Methods

- `mutate(mutator: (_state: ReturnType<typeof state.getState>) => any)`: Updates the microstore state with a new value and emits a "state.changed" event.

- `subscribe(callback: (_state: ReturnType<typeof state.getState>) => void)`: Subscribes to changes in the microstore state and invokes the provided callback when the state changes.

### `createCRUDObject(domain: keyof typeof state)`

Creates a set of CRUD operations for a specific domain in the state which is expected to be an object.

#### CRUD Object Methods

- `create(item: any)`: Adds a new item to the domain.
- `read(item: any)`: Reads an item from the domain by its ID.
- `update(item: any)`: Updates an item in the domain by its ID.
- `delete(item: { id: string })`: Deletes an item from the domain by its ID.
- `list()`: Lists all items in the domain.
- `search(keyword: string)`: Searches items in the domain by a keyword.

### `createCRUDArray(domain: keyof typeof state)`

Creates a set of CRUD operations for a specific domain in the state which is expected to be an array.

#### CRUD Array Methods

- `create(item: any)`: Adds a new item to the domain.
- `read(item: { id: string })`: Reads an item from the domain by its ID.
- `update(updatedItem: any)`: Updates an item in the domain by its ID.
- `delete(item: { id: string })`: Deletes an item from the domain by its ID.
- `list()`: Lists all items in the domain.
- `search(keyword: string)`: Searches items in the domain by a keyword.

## Comprehensive Usage Example

In this example, we'll demonstrate how to use `@brainstack/store` along with the `createCRUDObject` and `createCRUDArray` utility functions. We'll create a store with two domains: `profiles` (using an object structure) and `tasks` (using an array structure).

### 1. Setting Up

First, import the necessary functions and set up your initial state:

```javascript
import { createStore } from '@brainstack/store';
// ... (import other necessary utilities such as createCRUDObject and createCRUDArray)

const initialState = {
  profiles: {},
  tasks: []
};

const store = createStore({ initializer: initialState });
```

### 2. Create CRUD for Each Domain

Now, we'll generate CRUD operations for both `profiles` and `tasks`:

```javascript
const profilesCRUD = createCRUDObject('profiles');
const tasksCRUD = createCRUDArray('tasks');
```

### 3. Using the CRUD Operations

#### Profiles (Object structure)

```javascript
// Create
const newProfile = { name: 'Alice Brown', age: 25 };
profilesCRUD.create(newProfile);

// Read
const profile = profilesCRUD.read({ id: '123' });
console.log(profile);

// Update
const updatedProfile = { id: '123', name: 'Alice B.', age: 26 };
profilesCRUD.update(updatedProfile);

// Delete
profilesCRUD.delete({ id: '124' });

// List
const allProfiles = profilesCRUD.list();
console.log(allProfiles);

// Search
const foundProfiles = profilesCRUD.search('Alice');
console.log(foundProfiles);
```

#### Tasks (Array structure)

```javascript
// Create
const newTask = { title: 'Go for a walk', completed: false };
const taskId = tasksCRUD.create(newTask);
console.log(taskId);

// Read
const task = tasksCRUD.read({ id: 't1' });
console.log(task);

// Update
const updatedTask = { id: 't1', title: 'Read two books', completed: true };
tasksCRUD.update(updatedTask);

// Delete
tasksCRUD.delete({ id: 't2' });

// List
const allTasks = tasksCRUD.list();
console.log(allTasks);

// Search
const searchTasks = tasksCRUD.search('walk');
console.log(searchTasks);
```

# Contributing

Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

- Fork the repository  
- Create a new branch for your changes  
- Make your changes and commit them with descriptive commit messages  
- Push your changes to your fork  
- Submit a pull request  

# License

This module is released under the MIT License.
