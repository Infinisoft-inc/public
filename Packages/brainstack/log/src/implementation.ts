import { LoggerIntegration, Logger } from "./abstraction";
import { consoleIntegration } from "./consoleIntegration";

/**
 * Creates a logger with the specified log level and integrations.
 * @param level - The log level for the logger.
 * @param integrations - Optional array of logger integrations.
 * @returns The created logger instance.
 */
export const createLogger = (level: number, integrations: LoggerIntegration[] = []): Logger => {
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
      if (logger.level >= 3) {
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
      if (logger.level >= 4) {
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
      if (logger.level >= 2) {
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
      if (logger.level >= 1) {
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
      if (logger.level >= 5) {
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
