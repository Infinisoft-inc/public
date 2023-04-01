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
 * Skill class represents a collection of tasks.
 */
class Skill extends EventEmitter {
  /**
   * @param {Array<Task>} tasks - The list of tasks for the skill.
   */
  constructor(tasks) {
    super();
    this.tasks = tasks;
  }

  /**
   * Achieves the skill result and emits the appropriate events.
   * @param {Logger} logger - The logger instance.
   * @return {Promise<Array<*>>} The result of the skill.
   */
  async achieveResult(logger) {
    logger.log(2, 'Skill started');
    this.emit('skillStart', this);
    const results = [];
    for (const task of this.tasks) {
      results.push(await task.execute(logger));
    }
    logger.log(2, 'Skill completed');
    this.emit('skillComplete', this, results);
    return results;
  }
}
module.exports = Skill
