// TypeScript Interfaces
export interface ToolDescription {
    tool: string;
    description: string;
    argument: string;
    examples: Example[];
}

export interface Example {
    intention: string;
    expectation: string;
    outcome: string;
    usage: string;
}