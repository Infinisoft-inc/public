import { promptUser } from "../../../utils/promptUser";
import { IDataService } from "../../data/IDataService";
import { IParserService } from "../../parsers/IParserService";

export class MicroAppTemplateParserService implements IParserService {
  constructor(private dataService: IDataService) {}

  shouldRun(message: string): boolean {
    return false;
    // return /<EXECUTE_QUERY>[\s\S]*<\/EXECUTE_QUERY>/.test(message);
  }

  async run(message: string): Promise<void | string> {
    const instructions = message.match(
      /<EXECUTE_QUERY>([\s\S]*)<\/EXECUTE_QUERY>/
    )?.[1];

    if (this.shouldRun(message) && instructions) {
      const result = await this.action(instructions);
      return result;
    }
  }

  private async action(content: string) {
    const confirmation = promptUser(
      `Do you want to apply these changes: ${content}? (yes/no): `
    );
    if (confirmation.toLowerCase() === "yes") {
      await this.dataService.applyChanges(content);
      return "Supabase query executed successfully. query was: " + content;
    }

    return "User refused to run the database query. Simply aknowledge politely.";
  }
}
