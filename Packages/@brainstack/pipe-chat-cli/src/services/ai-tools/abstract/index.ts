import { ChatCompletionTool } from "openai/resources";
import { Tool } from "..";

interface Config {
  [key: string]: any;
}

export abstract class BaseTool<TConfig extends Config> implements Tool {
  abstract name: string;
  abstract description: string;
  abstract args: { [key: string]: { type: string; description: string } };

  protected config: TConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  protected abstract loadConfig(): TConfig;

  saveConfig(key: keyof TConfig, value: TConfig[keyof TConfig]): void {
    this.config[key] = value;
    this.persistConfig();
  }

  readConfig(key: keyof TConfig): TConfig[keyof TConfig] | undefined {
    return this.config[key];
  }

  private persistConfig(): void {
    // Implement the logic to persist the config to a file or database
    // Example: Save to JSON file
    // fs.writeFileSync('config.json', JSON.stringify(this.config));
  }

  get definition(): ChatCompletionTool {
    return {
      type: "function",
      function: {
        name: this.name,
        description: this.description,
        parameters: {
          type: "object",
          properties: this.args,
          required: Object.keys(this.args),
        },
      },
    };
  }

  abstract execute(args: any): Promise<string>;
}
