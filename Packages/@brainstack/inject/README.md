# @brainstack/inject

A lightweight dependency injection library for JavaScript and TypeScript, designed to facilitate dependency management and injection in your projects. Specifically enhanced for monorepo implementations like iBrain One, supporting singleton and transient services, custom scopes, and hierarchical dependency injection.

## Installation

```bash
npm install @brainstack/inject
```

## Usage

### 1. Create a Container

Create an instance of the `Container` class. Each module or package in your iBrain One monorepo should have its own container instance:

```typescript
import { Container, Service, Inject } from '@brainstack/inject';

const container = new Container();
```

### 2. Register Services

Register your services with the container using the `register` method. Use the `@Service` decorator for easy registration of classes as services.

```typescript
// Registering an instance
class Logger {
  log(message: string) {
    console.log(message);
  }
}
const logger = new Logger();
container.register(Logger, logger);

// Using @Service decorator (singleton)
@Service(container)
class ConsoleLogger {
  log(message: string) {
    console.log(message);
  }
}

// Registering a transient service (factory function)
class APIService {
  constructor(private baseUrl: string) {}
  getData() {}
}

container.register('apiService', () => new APIService('/api'), true); // true for transient
```

### 3. Inject Dependencies

Use the `@Inject` decorator to inject dependencies into your classes' constructors:

```typescript
class UserService {
  constructor(
    @Inject private logger: Logger,
    @Inject private apiServiceFactory: () => APIService
  ) {}

  logUserAction(action: string) {
    this.logger.log(`User performed action: ${action}`);
    const apiService = this.apiServiceFactory(); // Instantiate transient service
    apiService.getData();
  }
}
```

### 4. Resolve Instances

Get instances of your classes with dependencies resolved using `container.getInstance()`. For transient services, get the factory function using `container.get()` and call the factory to create the instance.

```typescript
const userService = container.getInstance(UserService); // Dependencies are injected
userService.logUserAction('login');

// Transient instantiation
const apiServiceFactory = container.get('apiService');
if (typeof apiServiceFactory === 'function') {
  const apiService = apiServiceFactory();
  apiService.getData();
}
```

## Service Scopes and Lifecycles

`@brainstack/inject` supports different service scopes and lifecycles, specifically designed to work efficiently within a monorepo architecture like iBrain One:

- **Singleton (default):** When you decorate a class with `@Service`, a single instance of that service is created and shared within the `Container` it's registered with. This is the default behavior and is ideal for services that should have one instance per module or custom scope.
- **Transient:** Use a factory function and register it with the `transient` flag set to true in the `register` method. This is best for services where you need a new instance each time they are injected.
- **Module/File Scope:** When you use the `@Service` decorator _without_ providing a `Container` instance, the service is registered in a default, module-scoped container. This is useful for services that should be singletons _within_ a specific module, without needing to create and manage a dedicated `Container` instance in that module. This ensures one instance per module/file where the service is injected without having to create custom containers.

## Parent/Child Containers (Hierarchical DI)

For more complex scenarios or cross-package dependencies in your iBrain One monorepo, you can use parent/child containers. Services registered in the parent container are available to child containers:

```typescript
const parentContainer = new Container();
const childContainer = new Container(parentContainer);

@Service(parentContainer)
class SharedService {
  /* ... */
}

class ChildService {
  constructor(@Inject private sharedService: SharedService) {} // Injected from parent
}

const childServiceInstance = childContainer.getInstance(ChildService);
```

## API

- **`class Container`**

  - `register<T>(id: ServiceIdentifier<T> | string | symbol, instanceOrFactory: T | (() => T), transient?: boolean): () => void`
  - `get<T>(id: ServiceIdentifier<T> | string | symbol): T | (() => T) | undefined`
  - `getInstance<T>(ctor: new (...args: any[]) => T): T`
  - `reset(): void`
  - `getRegisteredServiceIdentifiers(): (ServiceIdentifier<any> | string | symbol)[]`

- **`@Service(container?: Container)`**

- **`@Inject`**

## Contributing

Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and commit them with descriptive commit messages
4. Push your changes to your fork
5. Submit a pull request

## License

This module is released under the MIT License.