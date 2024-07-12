# @brainstack/inject

A lightweight dependency injection library for JavaScript and TypeScript, designed to facilitate dependency management and injection in your projects.

## Installation

You can install the package using npm:

```bash
npm install @brainstack/inject
```

## Usage

Import the `inject` function and use it to create a dependency container. You can then register and get for dependencies in the container.

### Importing

```typescript
import { inject } from '@brainstack/inject';
```

### Creating a Dependency Container

```typescript
const container = inject();
```

### Registering a Dependency

```typescript
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

const logger = new ConsoleLogger();

const unregister = container.register<Logger>('logger', logger);
```

### Getting a Dependency

```typescript
const retrievedLogger = container.get<Logger>('logger');
retrievedLogger.log('Hello, world!');
```

## Examples

### Example 1: Registering and Retrieving a Logger Service

```typescript
import { inject } from '@brainstack/inject';

const container = inject();

interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

const logger = new ConsoleLogger();

container.register<Logger>('logger', logger);

const retrievedLogger = container.get<Logger>('logger');
retrievedLogger.log('Hello, world!');
```

In this example, we define a `Logger` interface and create a `ConsoleLogger` class that implements this interface. We then register an instance of `ConsoleLogger` with the ID `'logger'` in the dependency container. Finally, we retrieve the logger service using the `get` method and use it to log a message.

## API

### `inject()`

Creates a new dependency container.

Returns: Dependency container object with methods.

#### `register<T>(id: string, instance: T): () => void`

Registers a new dependency in the container.

- `id`: The ID of the dependency.
- `instance`: The instantiated object of the dependency.

Returns: A function to unregister the API section of the README.md file:

#### `get<T>(id: string): T | undefined`

Gets a dependency from the container by its ID.

- `id`: The ID of the dependency.

Returns: The retrieved dependency or `undefined` if not found.

## Contributing

Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository
Create a new branch for your changes
Make your changes and commit them with descriptive commit messages
Push your changes to your fork
Submit a pull request

## License

This module is released under the MIT License.
