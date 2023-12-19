# Brainstack Tools SDK

Welcome to the Brainstack Tools SDK – a versatile toolkit designed to provide essential functionalities for various applications.

## Description

Brainstack Tools SDK offers a comprehensive set of tools and utilities that can be integrated into your software projects. It provides a streamlined way to manage and utilize a variety of tools, making your development process more efficient and effective.

## Installation

To install Brainstack Tools SDK, run the following command:

```bash
npm install @brainstack/tools
```

or if you're using `yarn`:

```bash
yarn add @brainstack/tools
```

## Usage

Here's a quick example to get you started with Brainstack Tools SDK:

```typescript
import { ToolSDK } from '@brainstack/tools';

const sdk = new ToolSDK();

// Add a new tool
sdk.addTool({
    tool: "exampleTool",
    description: "This is an example tool.",
    argument: "exampleArg",
    examples: [
        {
            intention: "Example intention",
            expectation: "Example expectation",
            outcome: "Example outcome",
            usage: "exampleTool(exampleArg)"
        }
    ]
});

// Generate tool descriptions
console.log(sdk.generateDescriptions());
```

## Features

- **Tool Management**: Easily add and manage tool descriptions.
- **JSON Import**: Import tool configurations from JSON.
- **Description Generation**: Generate formatted descriptions for your tools.

## API Reference

You can find more detailed API documentation in the `dist/index.d.ts` file.

## Building and Developing

To build the SDK, run:

```bash
npm run build
```

This will compile the TypeScript source files to JavaScript and generate type definitions in the `dist` folder.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to improve the SDK or add new functionalities.

## License

This project is licensed under the [MIT License](LICENSE).

