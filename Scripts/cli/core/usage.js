// core/usage.js

function usage(commands, command) {
    if (command && commands[command]) {
      // Display usage information for a specific command
      const commandInfo = commands[command];
      console.log(`Usage: cli.js ${command} [${commandInfo.options.join(' | ')}]`);
      console.log(`Description: ${commandInfo.description}`);
    } else {
      // Display general usage information
      console.log('Usage:');
      console.log('  ibrain-cli.js <command> [optional argument]');
      console.log('Available commands:');
      console.log(Object.keys(commands).join(', '));
    }
  }
  
  module.exports = usage;
  