// core/delCommand.js

const readline = require("readline");
const fs = require("fs");
const path = require("path");

function delCommand(commands) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter command name to delete: ", (commandName) => {
    if (!commands[commandName]) {
      console.error(`Command '${commandName}' does not exist.`);
      rl.close();
      return;
    }

    // Delete the command from the commands object
    delete commands[commandName];

    // Delete the command file from the commands directory
    const commandFilePath = path.join(
      __dirname,
      "..",
      "commands",
      `${commandName}.js`
    );
    fs.unlinkSync(commandFilePath);

    console.log(`Command '${commandName}' deleted.`);
    rl.close();
  });
}

module.exports = delCommand;
