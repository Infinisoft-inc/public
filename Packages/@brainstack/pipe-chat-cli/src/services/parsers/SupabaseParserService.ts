import { IParserService } from "./IParserService";
import { IDataService } from "../data/IDataService";
import { promptUser } from "../../utils/promptUser";

export class SupabaseParserService implements IParserService {
  constructor(private dataService: IDataService) {}

  shouldRun(message: string): boolean {
    return /<EXECUTE_QUERY>[\s\S]*<\/EXECUTE_QUERY>/.test(message);
  }

  async run(message: string): Promise<void> {
    const instructions = message.match(
      /<EXECUTE_QUERY>([\s\S]*)<\/EXECUTE_QUERY>/
    )?.[1];

    if (this.shouldRun(message) && instructions) {
      await this.action(instructions);
    }
  }

  private async action(content: string): Promise<void> {
    const confirmation = promptUser(
      `Do you want to apply these changes: ${content}? (yes/no): `
    );
    if (confirmation.toLowerCase() === "yes") {
      await this.dataService.applyChanges(content);
    }
  }
}
