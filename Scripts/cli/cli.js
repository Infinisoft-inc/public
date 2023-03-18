#!/usr/bin/env node
// cli.js

const loadCommands = require("./core/loadCommands");
const welcome = require("./core/welcome");
const usage = require("./core/usage");
const parse = require("./core/parse");
const coreCommands = require("./core");

// Load commands
const commands = loadCommands();

// Parse command line arguments
const args = process.argv.slice(2);
const { commandName, commandArgs } = parse(args);

// Execute the specified command
welcome();

if (coreCommands.has(commandName)) {
  // Call the corresponding function if the command exists
  const coreCommand = coreCommands.get(commandName);
  coreCommand(commands);
} else if (
  commands?.[commandName] &&
  typeof commands[commandName].execute === "function"
) {
  commands[commandName].execute(commandArgs);
} else {
  console.error(`Unknown command: ${commandName}`);
  usage(commands);
}
