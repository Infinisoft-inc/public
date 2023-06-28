import { LoggerIntegration, Logger, LogLevel } from "./abstraction";
import { consoleIntegration } from "./consoleIntegration";


/**
 * Creates a logger with the specified log level and integrations.
 * @param {LogLevel} level - The log level for the logger.
 *                            The log level determines which types of log messages are displayed.
 *                            Valid log levels are:
 *                            - LogLevel.ERROR (1): Log level for critical errors that may cause the application to stop functioning.
 *                            - LogLevel.WARNING (2): Log level for warning messages that indicate potential issues or unexpected behavior.
 *                            - LogLevel.LOG (3): Log level for general log messages providing information about the application's execution flow.
 *                            - LogLevel.INFO (4): Log level for informational messages that provide additional details about the application's state.
 *                            - LogLevel.VERBOSE (5): Log level for detailed messages that can be useful for debugging and troubleshooting.
 * @param {LoggerIntegration[]} [integrations] - Optional array of logger integrations.
 * @returns {Logger} The created logger instance.
 */
export const createLogger = (level: number = 3, integrations: LoggerIntegration[] = []): Logger => {
  const logger: Logger = {
    /**
     * Changes the log level of the logger.
     * @param level - The new log level.
     */
    changeLogLevel(level: number): void {
      logger.level = level;
    },

    /**
     * Adds a logger integration to the logger.
     * @param integration - The logger integration to add.
     */
    addIntegration(integration: LoggerIntegration): void {
      logger.integrations.push(integration);
    },

    /**
     * Removes a logger integration from the logger.
     * @param integration - The logger integration to remove.
     */
    removeIntegration(integration: LoggerIntegration): void {
      const index = logger.integrations.indexOf(integration);
      if (index !== -1) {
        logger.integrations.splice(index, 1);
      }
    },

    /**
     * Logs a message using the logger.
     * @param message - The message to log.
     */
    log(message: any): void {
      if (logger.level >= LogLevel.LOG) {
        logger.integrations.forEach((integration) => {
          integration.log(message);
        });
      }
    },

    /**
     * Logs an informational message using the logger.
     * @param message - The message to log.
     */
    info(message: any): void {
      if (logger.level >= LogLevel.INFO) {
        logger.integrations.forEach((integration) => {
          integration.info(message);
        });
      }
    },

    /**
     * Logs a warning message using the logger.
     * @param message - The message to log.
     */
    warn(message: any): void {
      if (logger.level >= LogLevel.WARNING) {
        logger.integrations.forEach((integration) => {
          integration.warn(message);
        });
      }
    },

    /**
     * Logs an error message using the logger.
     * @param message - The message to log.
     */
    error(message: any): void {
      if (logger.level >= LogLevel.ERROR) {
        logger.integrations.forEach((integration) => {
          integration.error(message);
        });
      }
    },

    /**
     * Logs a verbose message using the logger.
     * @param message - The message to log.
     */
    verbose(message: any): void {
      if (logger.level >= LogLevel.VERBOSE) {
        logger.integrations.forEach((integration) => {
          integration.verbose(message);
        });
      }
    },

    level,
    integrations: integrations.length ? integrations : [consoleIntegration],
  };

  return logger;
};
