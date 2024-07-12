import { IAiService } from "./IAiService";
import OpenAI from "openai";

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
