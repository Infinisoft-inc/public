# @brainstack/inject

A lightweight dependency injection library for JavaScript and TypeScript, designed to facilitate dependency management and injection in your projects.

## Installation

You can install the package using npm:

```bash
npm install @brainstack/inject
```

## Usage

Import the `register`, `get`, `Inject`, `Service`, and `getInstance` functions to create a dependency container. You can then register and get dependencies in the container.

### Importing

```typescript
import { register, get, Inject, Service, getInstance } from '@brainstack/inject';
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

const unregister = register<Logger>('logger', logger);
```

### Getting a Dependency

```typescript
const retrievedLogger = get<Logger>('logger');
retrievedLogger.log('Hello, world!');
```

### Using Decorators

#### Service Decorator

You can use the `@Service` decorator to automatically register a service class.

```typescript
@Service
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}
```

#### Inject Decorator

You can use the `@Inject` decorator to mark constructor parameters for dependency injection.

```typescript
class UserService {
  constructor(@Inject private logger: Logger) {}

  logUserAction(action: string) {
    this.logger.log(`User performed action: \${action}`);
  }
}
```

### Resolving Dependencies

You can resolve dependencies and create instances using the `getInstance` function.

```typescript
const userService = getInstance(UserService);
userService.logUserAction('login');
```

## Examples

### Example 1: Registering and Retrieving a Logger Service

```typescript
import { register, get } from '@brainstack/inject';

interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

const logger = new ConsoleLogger();
register<Logger>('logger', logger);

const retrievedLogger = get<Logger>('logger');
retrievedLogger.log('Hello, world!');
```

### Example 2: Using Decorators

```typescript
import { Inject, Service, getInstance } from '@brainstack/inject';

@Service
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

class UserService {
  constructor(@Inject private logger: Logger) {}

  logUserAction(action: string) {
    this.logger.log(`User performed action: \${action}`);
  }
}

const userService = getInstance(UserService);
userService.logUserAction('login');
```

## API

### `register<T>(id: string, instance: T): () => void`

Registers a new dependency in the container.

- `id`: The ID of the dependency.
- `instance`: The instantiated object of the dependency.

Returns: A function to unregister the service.

### `get<T>(id: string): T | undefined`

Gets a dependency from the container by its ID.

- `id`: The ID of the dependency.

Returns: The retrieved dependency or `undefined` if not found.

### `Inject(target: any, propertyKey: string | symbol | undefined, parameterIndex: number)`

Decorator to mark constructor parameters for dependency injection.

### `Service<T extends { new(...args: any[]): {} }>(constructor: T)`

Service decorator to register service classes.

### `getInstance<T>(ctor: new (...args: any[]) => T): T`

Resolves dependencies for a class and creates an instance.

## Contributing

Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and commit them with descriptive commit messages
4. Push your changes to your fork
5. Submit a pull request

## License

This module is released under the MIT License.
