import { IParserService } from "./IParserService";
import { promptUser } from "../../utils/promptUser";

export class ExitParserService implements IParserService {

  constructor() {
  }

  shouldRun(message: string): boolean {
    return /exit/i.test(message);
  }

  async run(message: string): Promise<void> {
    if (this.shouldRun(message)) {
      await this.action();
    }
  }

  private async action(): Promise<void> {
    const confirmation = promptUser(
      "Do you want to exit the chat? (yes/no): "
    );
    if (confirmation.toLowerCase() === "yes") {
      process.exit(1);
    }
  }
}
