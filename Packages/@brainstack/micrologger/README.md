# MicroLogger

MicroLogger is a lightweight logging utility class that allows you to log messages at different levels of severity. It supports the integration of custom logging mechanisms and comes with a default console integration.

## Usage

To use the MicroLogger class, follow these steps:

1. Import the MicroLogger class into your project:

   ```javascript
   import { MicroLogger } from 'micro-logger';
   ```

2. Create an instance of the MicroLogger class, specifying the desired log level and any custom integrations (optional):

   ```javascript
   const logger = new MicroLogger(3, [customIntegration]);
   ```

   The log level determines which messages will be logged. The available log levels are as follows:

   - `1` (Error): Only error messages will be logged.
   - `2` (Warning): Error and warning messages will be logged.
   - `3` (Log): Error, warning, and log messages will be logged.
   - `4` (Info): Error, warning, log, and info messages will be logged.
   - `5` (Verbose): All messages, including verbose messages, will be logged.

3. (Optional) Modify the log level:

   ```javascript
   logger.changeLogLevel(4);
   ```

   This method allows you to change the log level dynamically.

4. (Optional) Add custom integrations:

   ```javascript
   const customIntegration = {
     // Define custom log, info, warn, error, and verbose methods here
   };

   logger.addIntegration(customIntegration);
   ```

   Custom integrations should provide the following methods: `log`, `info`, `warn`, `error`, and `verbose`. These methods will be called when corresponding log methods are invoked on the logger instance.

5. Start logging messages:

   ```javascript
   logger.log('This is a log message');
   logger.info('This is an info message');
   logger.warn('This is a warning message');
   logger.error('This is an error message');
   logger.verbose('This is a verbose message');
   ```

   The messages will be logged based on the specified log level and the integrations configured for the logger instance.

## Default Console Integration

The MicroLogger class comes with a default console integration, which logs messages to the console using the `console.log`, `console.info`, `console.warn`, `console.error`, and `console.log` methods. The default integration is automatically added if no custom integrations are provided during instantiation.

To use the default console integration, follow these steps:

1. Import the MicroLogger class and create an instance:

   ```javascript
   import { MicroLogger } from 'micro-logger';

   const logger = new MicroLogger(3);
   ```

2. Start logging messages:

   ```javascript
   logger.log('This is a log message');
   logger.info('This is an info message');
   logger.warn('This is a warning message');
   logger.error('This is an error message');
   logger.verbose('This is a verbose message');
   ```

   The messages will be logged to the console using the corresponding console methods.

## Custom Integrations

You can create custom integrations by defining objects that provide the necessary log methods (`log`, `info`, `warn`, `error`, and `verbose`). These methods will be called when the corresponding log methods are invoked on the logger instance.

To add a custom integration, use the `addIntegration` method:

```javascript
const customIntegration = {
  // Define custom log, info, warn, error, and verbose methods here
};

logger.addIntegration(customIntegration);
```Ensure that your custom integration object includes all the required log methods.```

To remove a custom integration, use the `removeIntegration`

## Sentry.io Integration


```javascript
import { MicroLogger } from 'micro-logger';
import * as Sentry from '@sentry/node';

// Configure Sentry.io
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  // Add other configuration options as needed
});

// Create a custom integration for Sentry.io
const sentryIntegration = {
  log: (message) => Sentry.captureMessage(message),
  info: (message) => Sentry.captureMessage(message, { level: 'info' }),
  warn: (message) => Sentry.captureMessage(message, { level: 'warning' }),
  error: (message) => Sentry.captureException(new Error(message)),
  verbose: (message) => Sentry.captureMessage(message),
};

// Create an instance of MicroLogger with both console and Sentry.io integrations
const logger = new MicroLogger(3, [consoleIntegration, sentryIntegration]);

// Usage example
logger.log('This is a log message'); // Logged to console and Sentry.io
logger.info('This is an info message'); // Logged to console and Sentry.io
logger.warn('This is a warning message'); // Logged to console and Sentry.io
logger.error('This is an error message'); // Logged to console and Sentry.io
logger.verbose('This is a verbose message'); // Logged to console and Sentry.io
```