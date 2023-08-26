# @brainstack/inject

A lightweight dependency injection library for JavaScript and TypeScript.

## Installation

You can install the package using npm:

```bash
npm install @brainstack/inject
```

## Usage

Import the `inject` function and use it to create a dependency container. You can then register, get, and search for dependencies in the container.

### Importing

```javascript
import { inject, Dependency } from '@brainstack/inject';
```

### Creating a Dependency Container

```javascript
const container = inject();
```

### Registering a Dependency

```javascript
const dependency: Dependency = {
  id: 'testDependency',
  name: 'Test Dependency',
  description: 'A test dependency',
  run: () => {},
};

const unregister = container.register(dependency);
```

### Getting a Dependency

```javascript
const retrievedDependency = container.get('testDependency');
```

### Searching for Dependencies

```javascript
const searchResults = container.search('Test');
```

### Complete Example

```javascript
import { inject, Dependency } from '@brainstack/inject';

const container = inject();

const dependency: Dependency = {
  id: 'testDependency',
  name: 'Test Dependency',
  description: 'A test dependency',
  run: () => {},
};

const unregister = container.register(dependency);

const retrievedDependency = container.get('testDependency');

const searchResults = container.search('Test');
```

## API

### `inject()`

Creates a new dependency container.

Returns: Dependency container object with methods.

#### `register(dependency: Dependency): () => void`

Registers a new dependency in the container.

- `dependency`: An object containing the dependency details (id, name, description, run).

Returns: A function to unregister the dependency.

#### `get(id: string): Dependency | undefined`

Gets a dependency from the container by its ID.

- `id`: The ID of the dependency.

Returns: The retrieved dependency or `undefined` if not found.

#### `search(term: string): Dependency[]`

Searches for dependencies by name or description containing the search term.

- `term`: The search term.

Returns: An array of matching dependencies.

## Configuration

Before using the library, make sure you have the required API keys or endpoints for the selected integration.

## License

This project is licensed under the MIT License. You can find more details in the [LICENSE](LICENSE) file.
