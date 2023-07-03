/*!
 * Copyright (C) 2023 Infinisoft World Inc.
 *
 * This software is the property of Infinisoft World Inc. Unauthorized copying, modification,
 * distribution, or usage of this software, via any medium, is strictly prohibited.
 * All rights to this software are reserved by Infinisoft World Inc.
 *
 * Contact: info@infinisoft.world
 * Website: https://www.infinisoft.world
 */
// Logger class for logging messages
class Logger {
  /**
   * @param {number} level - The log level.
   */
  constructor(level) {
    this.level = level;
  }

  /**
   * Logs a message if the log level is greater than or equal to the specified level.
   * @param {number} level - The level of the log message.
   * @param {string} message - The log message.
   * @param {*} [data] - Additional data to log.
   */
  log(level, message, data) {
    if (this.level >= level) {
      console.log(`[${level}] ${message}`, data || '');
    }
  }
}

module.exports = Logger
