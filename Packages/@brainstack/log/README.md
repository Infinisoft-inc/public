# @brainstack/log

## Description

`@brainstack/log` is a logging package that provides a flexible and customizable logger for your JavaScript or TypeScript projects. It allows you to manage log levels and integrate with various logging systems.

The package provides the following abstractions:

### `LoggerIntegration`

Represents a logger integration that provides methods for logging messages at different levels.

- `log(message: any): void`: Logs a general message.
- `info(message: any): void`: Logs an informational message.
- `warn(message: any): void`: Logs a warning message.
- `error(message: any): void`: Logs an error message.
- `verbose(message: any): void`: Logs a verbose message.

### `Logger`

Represents a logger that manages log levels and integrations for logging messages.

- `integrations: LoggerIntegration[]`: The logger integrations.
- `level: number`: The current log level.
- `changeLogLevel(level: number): void`: Changes the log level of the logger.
- `addIntegration(integration: LoggerIntegration): void`: Adds a logger integration.
- `removeIntegration(integration: LoggerIntegration): void`: Removes a logger integration.
- `log(message: any): void`: Logs a message.
- `info(message: any): void`: Logs an informational message.
- `warn(message: any): void`: Logs a warning message.
- `error(message: any): void`: Logs an error message.
- `verbose(message: any): void`: Logs a verbose message.

## Features

- Flexible log level management.
- Customizable logger integrations.
- Supports logging at different levels: log, info, warn, error, verbose.

## Getting Started

### Installation

You can install the `@brainstack/log` package using npm:

```
npm install @brainstack/log
```

or yarn:

```
yarn add @brainstack/log
```

### Usage

Here's an example of how to use the `@brainstack/log` package:

```typescript
import { createLogger, consoleIntegration } from '@brainstack/log';

// Create a logger with a log level and integration
const logger = createLogger(3, [consoleIntegration]);

// Log messages at different levels
logger.log('This is a log message');
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.verbose('This is a verbose message');
```

## Use Case Walkthrough

Here's a walkthrough of a common use case for the `@brainstack/log` package:

1. Install the package using npm or yarn.
2. Import the necessary modules from `@brainstack/log`.
3. Create a logger using the `createLogger` function, specifying the log level and any desired integrations.
4. Use the logger to log messages at different levels using the provided methods (`log`, `info`, `warn`, `error`, `verbose`).

## Contributing

Contributions to `@brainstack/log` are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the GitHub repository.

## License

This package is licensed under the [MIT License](LICENSE).
