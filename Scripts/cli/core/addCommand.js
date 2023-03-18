// core/addCommand.js

const readline = require("readline");
const fs = require("fs");
const path = require("path");

function addCommand(commands) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter command name: ", (commandName) => {
    if (commands[commandName]) {
      console.error(`Command '${commandName}' already exists.`);
      rl.close();
      return;
    }

    rl.question("Enter command options (comma-separated): ", (optionsInput) => {
      const options = optionsInput.split(",").map((option) => option.trim());

      rl.question("Enter command description: ", (description) => {
        // Create a new command object with the provided information
        const newCommand = {
          name: commandName,
          description: description,
          options: options,
          execute: () => {
            console.log(`Command '${commandName}' executed.`);
          },
        };

        // Add the new command to the commands object
        commands[commandName] = newCommand;

        // Save the new command to a file in the commands directory
        const commandFilePath = path.join(
          __dirname,
          "..",
          "commands",
          `${commandName}.js`
        );
        const commandFileContent = `
exports.name = '${commandName}';
exports.description = '${description}';
exports.options = ${JSON.stringify(options)};
exports.execute = function(args) {
  console.log("Command '${commandName}' executed.");
};
        `;
        fs.writeFileSync(commandFilePath, commandFileContent);

        console.log(`Command '${commandName}' added.`);
        rl.close();
      });
    });
  });
}

module.exports = addCommand;
