# iBrain Cli

This is a customizable command line interface (CLI) that allows you to create and manage commands.

## Installation

To install the CLI globally, navigate to the CLI root folder and run the following command:

```
npm install -g .
```

This will make the CLI available from any directory on your system.

## Usage

To run the CLI, use the command specified in the `bin` field of your `package.json` file. For example, if your `package.json` has the following `bin` field:

```
"bin": {
  "ibrain-cli": "./cli.js"
}
```

You can run your CLI by typing `ibrain-cli` followed by any arguments or options in the command line.

## Adding Commands

To add a new command to the CLI, use the `addCommand` function from the `core/addCommand.js` module. This function prompts you to enter the command name, options, and description, and then creates a new command file in the `commands` directory.

Here's an example of how you can use the `addCommand` function:

```js
const commands = require('./commands');
const addCommand = require('./core/addCommand');

addCommand(commands);
```

## Removing Commands

To remove an existing command from the CLI, use the `delCommand` function from the `core/delCommand.js` module. This function prompts you to enter the command name and then deletes the corresponding command file from the `commands` directory.

Here's an example of how you can use the `delCommand` function:

```js
const commands = require('./commands');
const delCommand = require('./core/delCommand');

delCommand(commands);
```

## Help

To display a list of all available commands along with their options and descriptions, use the `help` function from the `core/help.js` module.

Here's an example of how you can use the `help` function:

```js
const commands = require('./commands');
const help = require('./core/help');

help(commands);
```

## License

This project is licensed under the ISC license.