import { Logger } from "@brainstack/log";
import { IProcessorProvider } from "../../providers/processors/IProcessorProvider";
import { promptUser } from "../../utils/promptUser";
import { IAiService } from "../ai/IAiService";
import { IDataService } from "../data/IDataService";
import { IChatService } from "./IChatService";
import { plantUmlErdSkill } from "../skills/erd.plantuml";

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
      const context = await this.dataService.getContext() + '\n\n' + plantUmlErdSkill;

      const userInput = promptUser("You: ");
      await this.userProcessorProvider.process(userInput);

      const aiResponse = await this.aiService.ask(userInput, context);
      this.logService.log(`AI: ${aiResponse}`);

      await this.aiProcessorProvider.process(aiResponse);
    }
  }
}
