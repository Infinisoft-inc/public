// core/help.js

function help(commands) {
    console.log('Available commands:');
    for (const commandName in commands) {
      const commandInfo = commands[commandName];
      console.log(`  ${commandName} [${commandInfo.options.join(' | ')}] - ${commandInfo.description}`);
    }
  }
  
  module.exports = help;
  