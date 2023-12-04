# BrainTool CLI

BrainTool CLI is a command-line interface tool for managing configuration in Node.js applications. It allows developers to easily set, get, and manage environment variables contained in `.env` files, streamlining the configuration process.

## Features
- Intuitive command-line interface for managing `.env` file variables.
- Ability to list, set, get, and delete environment variables.
- No dependencies, ensuring a lightweight tool.
- Simple installation and usage.

## Getting Started
1. Install BrainTool CLI globally using npm:
```bash
npm install -g @braintools/cli
```
2. Navigate to your project directory and run the tool:
```bash
braintool-cli
```

## Usage
Once installed, you can run `braintool-cli` in the terminal to start managing your `.env` configurations. Here are some commands you can use:

### List all variables
```bash
braintool-cli list
```
### Get a variable
```bash
braintool-cli get <key>
```
### Set a variable
```bash
braintool-cli set <key> <value>
```
### Delete a variable
```bash
braintool-cli delete <key>
```

## Contributing
Contributions to BrainTool CLI are welcome. Please ensure you follow the standard GitHub workflow: fork the repo, create a feature branch, commit your changes, push to the branch, and open a pull request.

## License
BrainTool CLI is open-source software [licensed as MIT](LICENSE).