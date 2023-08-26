# @brainstack/core

A collection of micro packages designed to streamline and enhance the development of modular applications.

## Installation

You can install the package using npm:

```bash
npm install @brainstack/core
```

## Packages Included

The `@brainstack/core` package is a bundle that includes the following micro packages, each tailored to address specific aspects of application development:

- **[@brainstack/inject](https://www.npmjs.com/package/@brainstack/inject)**: A lightweight dependency injection library for JavaScript and TypeScript. Simplify the management of object dependencies and promote code reusability.

- **[@brainstack/log](https://www.npmjs.com/package/@brainstack/log)**: A micro logger package that offers a simple and efficient way to manage logs and improve debugging processes.

- **[@brainstack/hub](https://www.npmjs.com/package/@brainstack/hub)**: A micro pub/sub package that facilitates seamless communication between different parts of your application, enabling efficient event-based architectures.

- **[@brainstack/state](https://www.npmjs.com/package/@brainstack/state)**: A micro state management library that empowers you to handle application state effortlessly, making it ideal for managing complex UI components or global application data.

- **[@brainstack/store](https://www.npmjs.com/package/@brainstack/store)**: A package that combines `@brainstack/hub` and `@brainstack/state` unlocking state management with event handling, providing a convenient solution for managing application state and responding to state changes using event-driven programming.

- **[@brainstack/config](https://www.npmjs.com/package/@brainstack/config)**: A micro config manager package that lets you manage configuration settings efficiently and flexibly, ensuring smooth application setup and behavior.

- **[@brainstack/agent](https://www.npmjs.com/package/@brainstack/agent)**: A package tailored for building model agents that help you encapsulate complex logic and behavior into reusable components.

- **[@brainstack/crud](https://www.npmjs.com/package/@brainstack/crud)**: A micro CRUD package that provides a convenient way to perform Create, Read, Update, and Delete operations on data sources, making data manipulation straightforward.

## Usage

The `@brainstack/core` package serves as a convenient entry point to access and utilize the included micro packages in your application.

### Importing

To use the various micro packages, simply import them from `@brainstack/core`. For example:

```javascript
import { inject, Dependency } from '@brainstack/core';
import { createLogger } from '@brainstack/core';
import { createHub } from '@brainstack/core';
// Import other packages as needed
```

### Example Use Case

Imagine you're building a sophisticated web application that requires efficient communication between components, detailed logging, and centralized state management. Instead of manually integrating separate libraries for these tasks, you can leverage the power of `@brainstack/core`.

```javascript
import { createLogger, createHub, createStateManager } from '@brainstack/core';

// Create a logger instance
const logger = createLogger();

// Create a hub for event communication
const hub = createHub();

// Create a state manager for managing application state
const stateManager = createStateManager();

// Now you can use these instances throughout your application
// ... other code ...
```

## Use Cases

The `@brainstack/core` package is ideal for:

- Building modular applications that follow best practices for dependency management, logging, and communication.
- Streamlining development by providing simple and focused solutions for common challenges.
- Simplifying the setup and management of application-wide configuration and state.
- Promoting code reusability and maintainability through encapsulated logic and agents.
- Ensuring consistent and efficient data manipulation with the CRUD package.

# Contributing

Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository  
Create a new branch for your changes  
Make your changes and commit them with descriptive commit messages  
Push your changes to your fork  
Submit a pull request

# License

This module is released under the MIT License.
