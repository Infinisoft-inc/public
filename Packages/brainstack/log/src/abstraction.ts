/**
 * Represents a logger integration.
 * An integration provides methods for logging messages at different levels.
 */
export interface LoggerIntegration {
    /**
     * Logs a general message.
     * @param message - The message to log.
     */
    log(message: any): void;
  
    /**
     * Logs an informational message.
     * @param message - The message to log.
     */
    info(message: any): void;
  
    /**
     * Logs a warning message.
     * @param message - The message to log.
     */
    warn(message: any): void;
  
    /**
     * Logs an error message.
     * @param message - The message to log.
     */
    error(message: any): void;
  
    /**
     * Logs a verbose message.
     * @param message - The message to log.
     */
    verbose(message: any): void;
  }
  
  /**
   * Represents a logger.
   * A logger manages log levels and integrations for logging messages.
   */
  export interface Logger {
    /**
     * The logger integrations.
     */
    integrations: LoggerIntegration[];
  
    /**
     * The current log level.
     */
    level: number;
  
    /**
     * Changes the log level of the logger.
     * @param level - The new log level to set.
     */
    changeLogLevel(level: number): void;
  
    /**
     * Adds a logger integration.
     * @param integration - The logger integration to add.
     */
    addIntegration(integration: LoggerIntegration): void;
  
    /**
     * Removes a logger integration.
     * @param integration - The logger integration to remove.
     */
    removeIntegration(integration: LoggerIntegration): void;
  
    /**
     * Logs a message.
     * @param message - The message to log.
     */
    log(message: any): void;
  
    /**
     * Logs an informational message.
     * @param message - The message to log.
     */
    info(message: any): void;
  
    /**
     * Logs a warning message.
     * @param message - The message to log.
     */
    warn(message: any): void;
  
    /**
     * Logs an error message.
     * @param message - The message to log.
     */
    error(message: any): void;
  
    /**
     * Logs a verbose message.
     * @param message - The message to log.
     */
    verbose(message: any): void;
  }
  