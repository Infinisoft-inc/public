
import { BaseTool } from "../../../../abstract";
import * as readline from 'readline';

interface DatabaseToolDeleteConfig {
  // connectionString: string;
}

export class DeleteConfigTool extends BaseTool<DatabaseToolDeleteConfig> {
  protected loadConfig(): DatabaseToolDeleteConfig {
    return {};
  }
  name: string;
  description: string;
  args: {};

  constructor() {
    super();
    this.name = "delete";
    this.description = "Delete a database configuration.";
    this.args = {};
  }

  async execute(): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve, reject) => {
      rl.question('Enter name of db to delete: ', (connectionString) => {
        rl.close();
        resolve(`Deleted db: ${connectionString}`);
      });
    });
  }
}
