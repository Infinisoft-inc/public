import { ChatCompletionTool } from "openai/resources";
import { ProcessorProvider } from "../../../providers/processors/ProcessorProvider";
import { IAiService } from "../../ai/IAiService";
import { BaseTool } from "../abstract";
import { OpenAIService } from "../../ai/OpenAIService";

interface MockToolConfig {
  aiProviderBaseUrl: string;
  aiProviderApiKey: string;
  aiModel: string;
}

export class MockTool extends BaseTool<MockToolConfig> {
  name: string;
  description: string;
  args: {
    intention: {
      type: string;
      description: string;
    };
  };

  private aiService: IAiService;
  private aiProcessor: ProcessorProvider;

  constructor() {
    super();
    this.name = "finance";
    this.description =
      "Useful when user request concerning finance. Argument is the user intention.";
    this.args = {
      intention: {
        type: "string",
        description: "Include the user intention.",
      },
    };
    this.aiService = new OpenAIService(
      this.config.aiProviderBaseUrl,
      this.config.aiProviderApiKey,
      this.config.aiModel
    );
    this.aiProcessor = new ProcessorProvider([
    ]);
  }

  protected loadConfig(): MockToolConfig {
    const config: MockToolConfig = {
      aiProviderBaseUrl: "https://api.groq.com/openai/v1",
      aiProviderApiKey:
        "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",
      aiModel: "llama3-70b-8192",
    };
    return config;
  }

  get definition(): ChatCompletionTool {
    return {
      type: "function",
      function: {
        name: this.name,
        description: this.description,
        parameters: {
          type: "object",
          properties: { intention: this.args.intention },
          required: ["intention"],
        },
      },
    };
  }

  async execute(args: { intention: string }): Promise<string> {
    // console.log(
    //   "this.config.dbConnectionString)",
    //   this.config.dbConnectionString
    // );
    // console.log("dataservuce", this.dataService);

    const context = ""

    // console.log("context", context);

    const userInput = args.intention;

    const aiResponse = await this.aiService.ask(userInput, context);
    console.log("aiResponse", aiResponse);

    const result = "Financial plan done!"//await this.aiProcessor.process(aiResponse);

    return Promise.resolve(
      `Tool answer: ${aiResponse}. Tool processor result: ${result}`
    );
  }
}
