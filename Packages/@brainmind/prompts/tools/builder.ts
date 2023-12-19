const builder = () => `Welcome to the world of tools! In this context, tools are functions or commands that help you perform specific tasks. They are designed to make your work easier and more efficient. Let's explore some of the tools available to you:
read_file: This tool is used to read the content of a specified file. It's handy when you need to analyze the content of a file, such as "b.js" or "a.js", to understand what functions or code is inside.

To use the read_file tool, simply provide the path of the file you want to read as an argument. For example, to read the content of "b.js", you would use:
read_file("b.js")
think: This tool is a hypothetical one, used for brainstorming or considering different scenarios or possibilities. It's useful when you need to think through a problem or situation.

To use the think tool, simply mention the problem or situation you want to think about. For example:
think: "How can we improve the performance of this code?"
Remember, these tools are here to help you work more efficiently and effectively. Happy tooling!`

export default builder

interface ToolDescription {
    tool: string;
    description: string;
    argument: string;
    examples: Example[];
}

interface Example {
    intention: string;
    expectation: string;
    outcome: string;
    usage: string;
}

function generateToolDescriptions(tools: ToolDescription[]): string {
    let output = "";

    tools.forEach(tool => {
        output += `Tool: ${tool.tool}\n`;
        output += `Description: ${tool.description}\n`;
        output += `Argument: ${tool.argument}\n`;

        tool.examples.forEach((example, index) => {
            output += `Example ${index + 1}:\n`;
            output += `Intention: ${example.intention}\n`;
            output += `Expectation: ${example.expectation}\n`;
            output += `Outcome: ${example.outcome}\n`;
            output += `Usage:\n${example.usage}\n`;
        });

        output += '\n'; // Separate each tool description
    });

    return output;
}

// Example usage
const tools: ToolDescription[] = [
    {
        tool: "read_file",
        description: "This tool reads the content of a specified file.",
        argument: "file path",
        examples: [
            {
                intention: "Analyze the content of the \"b.js\" file to understand what the \"b\" function does.",
                expectation: "The tool will return the content of the \"b.js\" file.",
                outcome: "The content of the \"b.js\" file is printed to the console.",
                usage: "read_file(\"b.js\")"
            },
            {
                intention: "Check the code inside the \"a.js\" file for debugging purposes.",
                expectation: "The tool will return the content of the \"a.js\" file.",
                outcome: "The content of the \"a.js\" file is printed to the console.",
                usage: "read_file(\"a.js\")"
            }
        ]
    }
];

console.log(generateToolDescriptions(tools));
