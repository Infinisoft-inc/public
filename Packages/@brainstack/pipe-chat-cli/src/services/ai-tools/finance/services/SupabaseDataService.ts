import { writeFileSync } from "fs";
import { IDataService } from "../../../data/IDataService";
import postgres from "postgres";

export class SupabaseDataService implements IDataService {
  private sql: ReturnType<typeof postgres>;

  constructor(connectionString: string) {
    this.sql = postgres(connectionString);
  }

  async init(): Promise<void> {
    // Any initialization logic
  }

  async getContext(): Promise<string> {
    try {
      const result = await this
        .sql`SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name, column_name;`;

      const schema: Record<string, any> = {};

      result.forEach((row: any) => {
        if (!schema[row.table_name]) {
          schema[row.table_name] = {
            columns: [],
          };
        }

        schema[row.table_name].columns.push({
          column_name: row.column_name,
          data_type: row.data_type,
        });
      });

      // console.log(JSON.stringify(schema));
      // writeFileSync("schema.json", JSON.stringify(schema, null, 2));

      const context =
        "Refer to the following database schema if required to answer: \n\n" +
        JSON.stringify(schema) +
        "\n\n" +
        "If the user requests to generate executable sql, you place the entire code inside <EXECUTE_QUERY> Place generated SQL code inside the tags. </EXECUTE_QUERY>. I am expecting only 1 <EXECUTE_SQL> code block containing the entire compete query for Supabase.";

      // console.log("Context length: ", context.length);

      return context;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async applyChanges(sqlQuery: string): Promise<void> {
    console.log("Applying changes.. ", sqlQuery);
    try {
      await this.sql.unsafe(sqlQuery);
      console.log("Changes applied successfully.");
    } catch (error) {
      console.log(error);
    }
  }
}
