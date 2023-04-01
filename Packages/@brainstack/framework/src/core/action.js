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
const EventEmitter = require('events');

/**
 * Action class represents the smallest unit of work.
 */
class Action extends EventEmitter {
  /**
   * @param {*} input - The input for the action.
   * @param {function} process - The function to process the input.
   */
  constructor(input, process) {
    super();
    this.input = input;
    this.process = process;
  }

  /**
   * Executes the action and emits the appropriate events.
   * @param {Logger} logger - The logger instance.
   * @return {Promise<*>} The result of the action.
   */
  async execute(logger) {
    logger.log(2, 'Action started');
    this.emit('actionStart', this);
    try {
      const result = await this.process(this.input);
      logger.log(2, 'Action completed');
      this.emit('actionComplete', this, result);
      return result;
    } catch (error) {
      logger.log(1, 'Action error', error);
      this.emit('actionError', this, error);
      throw error;
    }
  }
}
module.exports = Action
