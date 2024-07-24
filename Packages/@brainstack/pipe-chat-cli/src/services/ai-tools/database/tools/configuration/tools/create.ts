
import { BaseTool } from "../../../../abstract";
import * as readline from 'readline';

interface DatabaseToolCreateConfig {
  // connectionString: string;
}

export class CreateConfigTool extends BaseTool<DatabaseToolCreateConfig> {
  protected loadConfig(): DatabaseToolCreateConfig {
    return {};
  }
  name: string;
  description: string;
  args: {};

  constructor() {
    super();
    this.name = "create";
    this.description = "Create a new database configuration.";
    this.args = {};
  }

  async execute(): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve, reject) => {
      rl.question('Enter connection string: ', (connectionString) => {
        rl.close();
        resolve(`Created new database connection string: ${connectionString}`);
      });
    });
  }
}
