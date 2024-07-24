import { IAiService } from "../../../../ai/IAiService";
import { OpenAIService } from "../../../../ai/OpenAIService";
import { BaseTool } from "../../../abstract";
import { CreateConfigTool } from "./tools/create";
import { DeleteConfigTool } from "./tools/delete";
// import { IDataService } from "../../data/IDataService";
// import { IDatabaseConfig } from "./IDatabaseConfig";
// import { DatabaseConfigService } from "./services/DatabaseConfigService";
interface DatabaseToolConfig {
  aiProviderBaseUrl: string;
  aiProviderApiKey: string;
  aiModel: string;
}

export class DatabaseConfigTool extends BaseTool<DatabaseToolConfig> {
  name: string;
  description: string;
  args: {
    action: {
      type: string;
      description: string;
      // enum: ["create", "read", "update", "delete"],
    };
    // connectionString: {
    //   type: string;
    //   description: string;
    // };
  };

  private aiService: IAiService;
  constructor() {
    super();
    this.name = "configure";
    this.description = "Manage connexion configurations.";
    this.args = {
      action: {
        type: "string",
        description: "The action to perform on the configuration.",
        // enum: ["create", "read", "update", "delete"],
      },
      // connectionString: {
      //   type: "string",
      //   description: "The database connection string.",
      // },
    };
    // this.dataService = new DatabaseConfigService(this.config.dbConnectionString);
    this.aiService = new OpenAIService(
      this.config.aiProviderBaseUrl,
      this.config.aiProviderApiKey,
      this.config.aiModel
    );
  }

  protected loadConfig(): DatabaseToolConfig {
    const config: DatabaseToolConfig = {
      aiProviderBaseUrl: "https://api.groq.com/openai/v1",
      aiProviderApiKey:
        "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",
      aiModel: "llama3-70b-8192",
    };
    return config;
  }

  async execute(args: { action: string;  }): Promise<string> {
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
    const userInput = `The user want to peform a the action: ${args.action} in the context of database configuration.`;
    console.log("args ", args);

const tools = {
    create: new CreateConfigTool(),
    // read: new ReadDatabaseTool(),
    // update: new UpdateDatabaseTool(),
    delete: new DeleteConfigTool(),
}

    const aiResponse = await this.aiService.askWithTool(userInput, context,tools);
    // const aiResponse = await this.aiService.ask(userInput, context);
    console.log("aiResponse", aiResponse);

    // const result = await this.aiProcessor.process(aiResponse);

    return Promise.resolve(
      `Tool answer: ${aiResponse}. Tool processor result: ${aiResponse}`
    );
  }
}
