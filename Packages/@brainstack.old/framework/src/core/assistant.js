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
 * Assistant class represents a system capable of learning and applying skills.
 */
class Assistant extends EventEmitter {
  /**
   * @param {Array<Skill>} skills - The list of skills for the assistant.
   */
  constructor(skills) {
    super();
    this.skills = skills;
  }

  /**
   * Applies the assistant's skills and emits the appropriate events.
   * @param {*} input - The input for the skills.
   * @param {Logger} logger - The logger instance.
   * @return {Promise<Array<Array<*>>>} The results of applying the skills.
   */
  async applySkills(input, logger) {
    logger.log(2, 'Assistant started');
    this.emit('start');
    const results = [];
    for (const skill of this.skills) {
      skill.on('skillStart', () => this.emit('skillStart', skill));
      skill.on('skillComplete', (skill, result) => this.emit('skillComplete', skill, result));
      skill.on('taskStart', (task) => this.emit('taskStart', task));
      skill.on('taskComplete', (task, result) => this.emit('taskComplete', task, result));
      skill.on('actionStart', (action) => this.emit('actionStart', action));
      skill.on('actionComplete', (action, result) => this.emit('actionComplete', action, result));
      skill.on('actionError', (action, error) => this.emit('actionError', action, error));

      results.push(await skill.achieveResult(logger));
    }
    logger.log(2, 'Assistant completed');
    this.emit('complete', results);
    return results;
  }
}
module.exports = Assistant
