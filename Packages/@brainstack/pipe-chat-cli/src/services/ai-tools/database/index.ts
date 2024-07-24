import { ChatCompletionTool } from "openai/resources";
import { ProcessorProvider } from "../../../providers/processors/ProcessorProvider";
import { IAiService } from "../../ai/IAiService";
import { IDataService } from "../../data/IDataService";
import { plantUmlErdSkill } from "./prompts/erd.plantuml";
import { BaseTool } from "../abstract";
import { SupabaseDataService } from "./services/SupabaseDataService";
import { SupabaseParserService } from "./parsers/SupabaseParserService";
import { UmlDiagramParserService } from "./parsers/UmlDiagramParserService";
import { OpenAIService } from "../../ai/OpenAIService";
import { DatabaseConfigTool } from "./tools/configuration";
import { DatabaseQueryTool } from "./tools/query";

interface DatabaseToolConfig {
  dbConnectionString: string;
  aiProviderBaseUrl: string;
  aiProviderApiKey: string;
  aiModel: string;
}

export class DatabaseTool extends BaseTool<DatabaseToolConfig> {
  name: string;
  description: string;
  args: {
    goal: {
      type: string;
      description: string;
    };
    intention: {
      type: string;
      description: string;
    };
  };

  private aiService: IAiService;
  private dataService: IDataService;
  private aiProcessor: ProcessorProvider;

  constructor() {
    super();
    this.name = "database";
    this.description =
      "Useful when user request concerning database. Arguments are: 1. The request goal about database, for example: configure new database, execute query against an configured database, generate a diagram of database. 2. The user intention with details.";
    this.args = {
      goal: {
        type: "string",
        description: "The goal of database task.",
        //   enum: ["create", "update", "delete", "read"],
      },
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
    this.dataService = new SupabaseDataService(this.config.dbConnectionString);
    this.aiProcessor = new ProcessorProvider([
      new SupabaseParserService(this.dataService),
      new UmlDiagramParserService(),
    ]);
  }

  protected loadConfig(): DatabaseToolConfig {
    const config: DatabaseToolConfig = {
      dbConnectionString:
        "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
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
          properties: { goal: this.args.goal, intention: this.args.intention },
          required: ["goal", "intention"],
        },
      },
    };
  }

  async execute(args: { goal: string; intention: string }): Promise<string> {
    // console.log(
    //   "this.config.dbConnectionString)",
    //   this.config.dbConnectionString
    // );
    // console.log("dataservuce", this.dataService);

    const context = ""//`The user goal is ${args.goal}. The user intention is ${args.intention}.`;
    // const context =
    //   (await this.dataService.getContext()) + "\n\n" + plantUmlErdSkill;

    // console.log("context", context);

    // const userInput = args.intention;
    const userInput = `The user goal is ${args.goal}. The user intention is ${args.intention}.`;
    console.log("args ", args);

const tools = {
    configure: new DatabaseConfigTool(),
    query: new DatabaseQueryTool(),
    // generate_diagram: new GenerateDiagramTool(),
}

    const aiResponse = await this.aiService.askWithTool(userInput, context,tools);
    // const aiResponse = await this.aiService.ask(userInput, context);
    console.log("aiResponse", aiResponse);

    const result = await this.aiProcessor.process(aiResponse);

    return Promise.resolve(
      `Tool answer: ${aiResponse}. Tool processor result: ${result}`
    );
  }
}
