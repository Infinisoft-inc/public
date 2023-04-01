# Brainstack Framework
The Brainstack Framework is a JavaScript library for building problem-solving solutions through a hierarchical approach that combines actions, tasks, skills, and assistants. It provides a flexible, event-driven architecture and allows for granular control over the execution of tasks.

## Overview
The framework is based on the Brainstack Foundation Principle and consists of the following components:

- Action: The smallest unit of work, representing a single process.
- Task: A combination of multiple actions organized to achieve a specific goal.
- Skill: A collection of tasks required to achieve a specific result.
- Assistant: A system capable of learning and applying a broad range of skills.

## Installation

You can install the Brainstack Framework using npm:

```bash
npm install @brainstack/framework
```

## Usage

First, import the required classes:

```javascript
const { Action, Task, Skill, Assistant, Logger } = require('@brainstack/framework');
```

Create actions, tasks, skills, and an assistant:

```javascript
const action1 = new Action(input1, process1);
const action2 = new Action(input2, process2);

const task1 = new Task([action1, action2]);
const task2 = new Task([action3]);

const skill1 = new Skill([task1]);
const skill2 = new Skill([task2]);

const assistant = new Assistant([skill1, skill2]);

const logger = new Logger(5); // Log level set to 5 (debug)
```

Apply the assistant's skills:

```javascript
(async () => {
  try {
    const results = await assistant.applySkills(input, logger);
    console.log('Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```

Handle events:

```javascript
assistant.on('start', () => console.log('Assistant started'));
assistant.on('complete', (results) => console.log('Assistant completed', results));
assistant.on('skillStart', (skill) => console.log('Skill started', skill));
assistant.on('skillComplete', (skill, result) => console.log('Skill completed', skill, result));
assistant.on('taskStart', (task) => console.log('Task started', task));
assistant.on('taskComplete', (task, result) => console.log('Task completed', task, result));
assistant.on('actionStart', (action) => console.log('Action started', action));
assistant.on('actionComplete', (action, result) => console.log('Action completed', action, result));
assistant.on('actionError', (action, error) => console.log('Action error', action, error));
```

## Documentation
For more detailed documentation and examples, refer to the [GitHub repository](https://github.com/Infinisoft-inc/public.git).
