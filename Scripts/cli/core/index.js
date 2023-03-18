// core/index.js

const help = require('./help');
const addCommand = require('./addCommand');
const delCommand = require('./delCommand');

// Create a commands Map
const commands = new Map();

// Add commands to the Map
commands.set('help', help);
commands.set('addCommand', addCommand);
commands.set('delCommand', delCommand);

module.exports = commands;
