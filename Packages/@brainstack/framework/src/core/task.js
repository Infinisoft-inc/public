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
 * Task class represents a combination of multiple actions.
 */
class Task extends EventEmitter {
  /**
   * @param {Array<Action>} actions - The list of actions for the task.
   */
  constructor(actions) {
    super();
    this.actions = actions;
  }

  /**
   * Executes the task and emits the appropriate events.
   * @param {Logger} logger - The logger instance.
   * @return {Promise<Array<*>>} The result of the task.
   */
  async execute(logger) {
    logger.log(2, 'Task started');
    this.emit('taskStart', this);
    const results = [];
    for (const action of this.actions) {
      results.push(await action.execute(logger));
    }
    logger.log(2, 'Task completed');
    this.emit('taskComplete', this, results);
    return results;
  }
}
module.exports = Task
