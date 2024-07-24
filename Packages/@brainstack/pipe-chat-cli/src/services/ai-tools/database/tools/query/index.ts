import { BaseTool } from "../../../abstract";
// import { IDataService } from "../../data/IDataService";
// import { IDatabaseConfig } from "./IDatabaseConfig";
// import { DatabaseConfigService } from "./services/DatabaseConfigService";
interface DatabaseQueryToolConfig {
  // dbConnectionString: string;
}

export class DatabaseQueryTool extends BaseTool<DatabaseQueryToolConfig> {
  name: string;
  description: string;
  args: {
    // action: {
    //   type: string;
    //   description: string;
    //   enum: ["create", "read", "update", "delete"],
    // };
    query: {
      type: string;
      description: string;
    };
  };

  // private dataService: IDataService;
  constructor() {
    super();
    this.name = "query";
    this.description = "Useful to execute query.";
    this.args = {
      query: {
        type: "string",
        description: "The description of the query to execute.",
        // enum: ["create", "read", "update", "delete"],
      },
      // connectionString: {
      //   type: "string",
      //   description: "The database connection string.",
      // },
    };
    // this.dataService = new DatabaseConfigService(this.config.dbConnectionString);
  }

  protected loadConfig(): DatabaseQueryToolConfig {
    const config: DatabaseQueryToolConfig = {
      // dbConnectionString: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
    };
    return config;
  }

  async execute(args: { query: string }): Promise<string> {
    // await this.dataService.createConnectionString(args.connectionString);
    return `Execute query: ${args}`;
  }
}
