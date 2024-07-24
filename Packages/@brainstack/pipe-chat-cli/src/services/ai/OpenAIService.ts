import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
} from "openai/resources";
import { IAiService } from "./IAiService";
import OpenAI from "openai";
import { Tool, Tools } from "../ai-tools";

export class OpenAIService implements IAiService {
  private ai: OpenAI;
  private model: string;

  constructor(baseURL: string, apiKey: string, model: string) {
    this.ai = new OpenAI({
      apiKey,
      baseURL,
    });
    this.model = model;
  }

  private executeToolCall =
    (tools: Tools) => async (toolCall: ChatCompletionMessageToolCall) => {
      const tool = tools[toolCall.function.name];
      
      if (!tool) {
        console.error(
          `No tool found with name: ${String(toolCall.function.name).toLowerCase()}`
        );
        return null;
      }

      try {
        // const args = JSON.parse(toolCall.function.arguments);
        // console.log(
        //   `Tool Call Function Name: ${String(
        //     toolCall.function.name
        //   ).toLowerCase()} with argument`,
        //   args
        // );
        const content = await tool.execute(toolCall.function.arguments);
        // // const content = await tool.execute(args);
        // console.log(
        //   `Tool Call Function Name: ${String(toolCall.function.name).toLowerCase()} with argument`,args, ` Result: `, content
        // );
        return {
          content,
          tool_call_id: toolCall.id,
        };
      } catch (error:any) {
       console.error(`Error executing tool ${toolCall.function.name}:`, error);
        return error?.message
      }
    };

  async askWithTool(
    message: string,
    context: string,
    tools: Tools
  ): Promise<string> {
    const messages: Array<ChatCompletionMessageParam> = [
      { role: "system", content: context },
      { role: "user", content: message },
      {
        role: "system",
        content: `You are iBrain One an AI assistant. You will call apprropriate function only if required. Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous. If no tool call required just answer.`,
      },
    ];

    const response = await this.ai.chat.completions.create({
      model: this.model,
      messages,
      tool_choice: "auto",
      tools: Object.keys(tools).map((key) => tools[key].definition),
      temperature: 0.8,
    });

    // console.log(JSON.stringify(response, null, 2));

    if (response?.choices?.[0]?.message?.tool_calls) {
      const toolCallsPromises = response.choices[0].message.tool_calls.map(
         this.executeToolCall(tools)
      );
      const toolResponses = await Promise.all(toolCallsPromises);

      const validResponses = toolResponses.filter(
        (response:any) => response !== null
      );

      validResponses.forEach((args:any) => {
        if (!args) return;
        const { content, tool_call_id } = args;
        messages.push({
          role: "tool",
          tool_call_id,
          content,
        });
      });

      const finalResponse = await this.ai.chat.completions.create({
        model: this.model,
        messages,
      });

      return finalResponse?.choices?.[0]?.message?.content?.trim() ?? "";
    }

    return response?.choices?.[0]?.message?.content?.trim() ?? "";
  }

  async ask(message: string, context: string): Promise<string> {
    const response = await this.ai.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: context },
        { role: "user", content: message },
      ],
    });

    return response?.choices?.[0]?.message?.content?.trim() ?? "";
  }
}
