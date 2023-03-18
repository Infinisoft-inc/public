// core/parse.js

function parse(args) {
    const commandName = args[0];
    const commandArgs = args.slice(1);
    return { commandName, commandArgs };
  }
  
  module.exports = parse;