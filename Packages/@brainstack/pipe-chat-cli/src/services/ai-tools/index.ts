import { ChatCompletionTool } from "openai/resources";

export type ExecuteFunction = (...args: any[]) => Promise<any>;

export type Tools = Record<string, Tool>;

export interface Tool {
  definition: ChatCompletionTool;
  execute: ExecuteFunction;
}

export type Property = { type: string; description: string };
export type Properties = Record<string, Property>;

export const createTool = (
  name: string,
  description: string,
  required: string[],
  properties: Properties,
  executeFn: ExecuteFunction,

): Tool => {
  const toolDefinition: ChatCompletionTool = {
    type: "function",
    function: {
      name,
      description,
      parameters: {
        type: "object",
        properties,
        required,
      },
    },
  };

  return {
    definition: toolDefinition,
    execute: executeFn,
  };
};
