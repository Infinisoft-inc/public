import { Tools } from "../ai-tools";

export interface IAiService {
  ask(message: string, context: string): Promise<string>;
  askWithTool(message: string, context: string, tools: Tools): Promise<string>;
}
