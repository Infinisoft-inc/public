import { LoggerIntegration } from "./abstraction";

/**
 * Default console integration.
 * Provides logging methods that are bound to the console object.
 */
export const consoleIntegration: LoggerIntegration = {
  /**
   * Logs a message to the console.
   * @param message - The message to log.
   */
  log: console.log.bind(console),

  /**
   * Logs an informational message to the console.
   * @param message - The message to log.
   */
  info: console.info.bind(console),

  /**
   * Logs a warning message to the console.
   * @param message - The message to log.
   */
  warn: console.warn.bind(console),

  /**
   * Logs an error message to the console.
   * @param message - The message to log.
   */
  error: console.error.bind(console),

  /**
   * Logs a verbose message to the console.
   * @param message - The message to log.
   */
  verbose: console.log.bind(console),
};
