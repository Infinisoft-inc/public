import { ToolDescription } from "./abstraction";

// Core SDK Class for Tool Management
export class ToolSDK {
    private tools: ToolDescription[];

    constructor() {
        this.tools = [];
    }

    public addTool(tool: ToolDescription): void {
        this.tools.push(tool);
    }

    public importToolsFromJSON(jsonString: string): void {
        try {
            const newTools = JSON.parse(jsonString) as ToolDescription[];
            this.tools = [...this.tools, ...newTools];
        } catch (error) {
            console.error("Failed to import from JSON:", error);
        }
    }

    public generateDescriptions(): string {
        return this.tools.map(tool => this.formatToolDescription(tool)).join('\n\n');
    }

    private formatToolDescription(tool: ToolDescription): string {
        let description = `Tool: ${tool.tool}\nDescription: ${tool.description}\nArgument: ${tool.argument}\n`;
        tool.examples.forEach((example, index) => {
            description += `Example ${index + 1}:\n`;
            description += `Intention: ${example.intention}\n`;
            description += `Expectation: ${example.expectation}\n`;
            description += `Outcome: ${example.outcome}\n`;
            description += `Usage:\n${example.usage}\n`;
        });
        return description;
    }
}
