// core/loadCommands.js

const fs = require('fs');
const path = require('path');

function loadCommands() {
  const commands = {};
  const commandDir = path.join(__dirname, '..', 'commands');
  fs.readdirSync(commandDir).forEach((file) => {
    const commandName = path.basename(file, '.js');
    const command = require(path.join(commandDir, file));
    commands[commandName] = command;
  });
  return commands;
}

module.exports = loadCommands;