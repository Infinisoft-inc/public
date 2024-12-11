# @brainstack/inject - A Powerful Dependency Injection Library

`@brainstack/inject` is a lightweight yet robust dependency injection (DI) library designed for JavaScript and TypeScript projects. It simplifies dependency management, promotes code reusability, and enhances testability. This library is particularly well-suited for projects with complex dependency graphs, including monorepo architectures, providing support for various service scopes and simplifying the process of dependency injection.

## Key Features

- **Constructor Injection:** Dependencies are injected directly into class constructors, making them explicit and easy to manage.
- **Singleton, Transient, and Scoped Services:** Supports various service lifetimes, including singleton (one instance shared across the application), transient (new instance created each time), and scoped (instances managed within a specific container).
- **Decorators:** Provides helper functions like `@Service`, `@SingletonService`, and `@Inject` for simplified service creation and registration.
- **Hierarchical DI:** Allows for parent-child container relationships, enabling dependency management across different parts of your application or within a monorepo.
- **Testability:** Facilitates unit testing by allowing easy mocking and swapping of dependencies.
- **Simple API:** Easy-to-use decorators and container methods minimize boilerplate code.

## Installation

```bash
npm install @brainstack/inject
```

## Usage

### 1. Core Concepts

- **Services:** Reusable components or functions that provide specific functionalities within your application.
- **Dependency Injection:** A design pattern where dependencies are provided to a class instead of being created within the class itself.
- **Container:** Manages the registration and resolution of dependencies.
- **Service Identifiers:** Used to identify and retrieve services from the container (class constructors, strings, or Symbols).
- **Service Scopes:** Define the lifetime of a service instance (singleton, transient, or custom scope).

### 2. Basic Dependency Injection

```typescript
import { Container, Service, Inject } from '@brainstack/inject';

// Create a container
const container = new Container();

// Define a service
@Service()
class DatabaseService {
  getData() {
    return 'Data from database';
  }
}

// Define a class that depends on the service
@Service() // MyClass is also a service, so can be injected elsewhere
class MyClass {
  constructor(@Inject private dbService: DatabaseService) {}

  doSomething() {
    const data = this.dbService.getData();
    console.log(data); // Output: 'Data from database'
  }
}

// Get an instance of MyClass with its dependencies injected
const myInstance = container.getInstance(MyClass);
myInstance.doSomething();
```

### 3. Service Scopes

- **Singleton Services:** Created once and shared throughout the application.

```typescript
import { SingletonService } from '@brainstack/inject';

@SingletonService
class LoggerService {
  // ...
}
```

- **Transient Services:** A new instance is created each time they are injected. You register these directly with the container, typically using a factory function:

```typescript
container.register('myTransientService', () => new MyTransientService(), true); // true for transient

// Accessing the transient service
const transientServiceFactory = container.get('myTransientService');
const transientInstance1 = transientServiceFactory(); // New instance
const transientInstance2 = transientServiceFactory(); // Another new instance
```

- **Scoped Services:** Managed within a specific container. Useful for creating isolated scopes or modules within your application. You use `asScopedService` to ensure it gets registered to only a particular container.

```typescript
import { asScopedService } from '@brainstack/inject';

const scopedContainer = new Container();

const ScopedService = asScopedService(MyService, scopedContainer);

const scopedInstance = scopedContainer.getInstance(ScopedService);
```

### 5. Container API

- **`register(identifier, instanceOrFactory, transient?)`:** Registers a service with the container.
- **`get(identifier)`:** Retrieves a service from the container. Returns `undefined` if not found.
- **`getInstance(ctor)`:** Resolves dependencies and creates an instance of the given class (constructor injection).
- **`reset()`:** Removes all registered services (useful for testing).
- **`getRegisteredServiceIdentifiers()`:** Returns an array of registered service identifiers.

### 6. Hierarchical DI

You can create parent-child container relationships to manage dependencies across different parts of your application.

```typescript
const parentContainer = new Container();
const childContainer = new Container();

@Service(parentContainer) // Make AuthService available to child containers
class AuthService {
  /* ... */
}

// Register a service specific to the child container

@Service(childContainer)
class ChildService {
  constructor(@Inject private authService: AuthService) {} // Injected from parent
}

const childInstance = childContainer.getInstance(ChildService); // authService injected
```

## Advanced Usage and Best Practices

- **Custom Scopes:** Implement custom service lifetimes based on your specific needs.
- **Circular Dependencies:** The library will detect and throw an error if you have circular dependencies. Restructure your services to avoid this or provide alternative instantiation methods (e.g. factories).

## Examples

### Injecting Singleton and Transient Services

```typescript
import {
  Container,
  Service,
  Inject,
  SingletonService,
  asService,
} from '@brainstack/inject';

const container = new Container();

class BaseLogger {
  log(m: string) {
    console.log(m);
  }
}

const LoggerService = asSingletonService(BaseLogger);

@Service()
class DatabaseService {
  getData() {
    return 'data!';
  }
}

@Service()
class MyService {
  constructor(
    @Inject private database: DatabaseService,
    @Inject private logger: LoggerService
  ) {}

  doWork() {
    this.logger.log('doing work');
    return this.database.getData();
  }
}

const myService = container.getInstance(MyService); // logger and database injected
myService.doWork(); // Output: doing work, then data from database
```

This enhanced documentation provides more comprehensive explanations, clearer code examples, and a better structure to help developers effectively utilize the `@brainstack/inject` library. It highlights the library's key features, including its helper functions, hierarchical DI support, and various service scopes, making it a valuable resource for both novice and experienced developers.
