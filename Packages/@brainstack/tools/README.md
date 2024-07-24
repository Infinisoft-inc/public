**@brainstack/tools**
=====================

A collection of tools for building chat completion models with OpenAI.

**Getting Started**
-------------------

To use this package, you'll need to create a new tool by extending the `BaseTool` abstract class. This class provides a basic implementation of a tool, including configuration management and a definition for the OpenAI Chat Completion model.

**Creating a New Tool**
---------------------

To create a new tool, follow these steps:

1. Create a new file for your tool, e.g. `MyTool.ts`.
2. Import the `BaseTool` class from `@brainstack/tools`.
3. Extend the `BaseTool` class and implement the required abstract methods:
	* `name`: a string that identifies your tool.
	* `description`: a string that describes what your tool does.
	* `args`: an object that defines the input parameters for your tool.
	* `loadConfig()`: a method that loads the configuration for your tool.
	* `execute(args)`: a method that executes your tool with the given input parameters.
4. Implement any additional logic or functionality required by your tool.

Here's an example of what your `MyTool.ts` file might look like:
```typescript
import { BaseTool } from '@brainstack/tools';

interface MyConfig {
  foo: string;
  bar: number;
}

class MyTool extends BaseTool<MyConfig> {
  name = 'My Tool';
  description = 'This is my tool';
  args = {
    foo: { type: 'string', description: 'Foo parameter' },
    bar: { type: 'number', description: 'Bar parameter' },
  };

  protected loadConfig(): MyConfig {
    // Load configuration from a file or database
    return { foo: 'default foo', bar: 42 };
  }

  execute(args: any): Promise<string> {
    // Execute your tool logic here
    return Promise.resolve(`Hello, world! Foo is ${args.foo} and bar is ${args.bar}`);
  }
}
```
**Using Your Tool**
-----------------

Once you've created your tool, you can use it in your application like this:
```typescript
const tools: Tools = {
  database: new DatabaseTool(),
  finance: new MockTool(),
};

const userInput = 'What is the stock price of Apple?';
const context = 'finance';

const aiResponse = await this.aiService.askWithTool(
  userInput,
  context,
  tools
);
console.log(aiResponse);
```
In this example, we create an object `tools` that contains instances of different tools. We then pass this object to the `askWithTool` method, along with the user input and context. The `askWithTool` method will determine which tool to use based on the context and execute the tool with the given input parameters.

**Configuration Management**
-------------------------

The `BaseTool` class provides basic configuration management features. You can save and read configuration values using the `saveConfig()` and `readConfig()` methods.

For example:
```typescript
const myTool = new MyTool();
myTool.saveConfig('foo', 'new foo value');
console.log(myTool.readConfig('foo')); // Output: "new foo value"
```
**Definition for OpenAI Chat Completion**
------------------------------------

The `BaseTool` class also provides a `definition` property that returns a OpenAI Chat Completion model definition for your tool.

For example:
```typescript
console.log(myTool.definition);
// Output:
// {
//   type: "function",
//   function: {
//     name: "My Tool",
//     description: "This is my tool",
//     parameters: {
//       type: "object",
//       properties: {
//         foo: { type: "string", description: "Foo parameter" },
//         bar: { type: "number", description: "Bar parameter" },
//       },
//       required: ["foo", "bar"],
//     },
//   },
// }
```
