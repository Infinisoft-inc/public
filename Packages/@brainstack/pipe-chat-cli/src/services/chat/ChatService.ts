import { Logger } from "@brainstack/log";
import { IProcessorProvider } from "../../providers/processors/IProcessorProvider";
import { promptUser } from "../../utils/promptUser";
import { IAiService } from "../ai/IAiService";
import { IDataService } from "../data/IDataService";
import { IChatService } from "./IChatService";
import { plantUmlErdSkill } from "../ai-tools/database/prompts/erd.plantuml";
import { Tools, createTool } from "../ai-tools";
import { DatabaseTool } from "../ai-tools/database";
import { MockTool } from "../ai-tools/finance";
import { FSDataService } from "../fs/FSDataService";
import tool from "../fs/fs.tool";

export class ChatService implements IChatService {
  constructor(
    private aiService: IAiService,
    private dataService: IDataService,
    private aiProcessorProvider: IProcessorProvider,
    private userProcessorProvider: IProcessorProvider,
    private logService: Logger
  ) {}

  public async chat(): Promise<void> {
    this.logService.log('Chatting with AI. Type "exit" to quit.');

    while (true) {
      const context1 = await this.dataService.getContext();

      // const context = await new FSDataService("", "").getContext();
      // + "\n\n" + plantUmlErdSkill;
      // const context = "";
      const context =
        `We are creating a software project together.
        Project Source Codes are in:
        /home/nitr0gen/rqrsda24/src`;
      const userInput = promptUser("You: ");
      await this.userProcessorProvider.process(userInput);

      // const aiResponse = await this.aiService.ask(userInput, context);
      const aiResponse = await this.aiService.askWithTool(
        userInput,
        context,
        tool
      );

      /**
 * FOR AI TOOL
      const tools: Tools = {
        database: new DatabaseTool(),
        finance: new MockTool(),
      };

      const aiResponse = await this.aiService.askWithTool(
        userInput,
        context,
        tools
      );
      this.logService.log(`AI: ${aiResponse}`);

***/

      await this.aiProcessorProvider.process(aiResponse);

      console.log(aiResponse);
    }
  }
}
