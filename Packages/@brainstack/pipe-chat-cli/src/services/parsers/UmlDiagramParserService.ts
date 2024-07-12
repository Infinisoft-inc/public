import { IParserService } from "./IParserService";
import { DiagramModule } from "@brainstack/diagram";

export class UmlDiagramParserService implements IParserService {
  constructor() {}

  shouldRun(message: string): boolean {
    return /@startuml[\s\S]*@enduml/.test(message);
  }

  async run(message: string): Promise<void> {
    const instructions = message.match(/@startuml([\s\S]*@enduml)/)?.[1];

    if (this.shouldRun(message) && instructions) {
      await this.action(instructions);
    }
  }

  private async action(content: string): Promise<void> {
    const diagramLink = DiagramModule.generate_png(content);
    console.log(`Your diagram is ready. Here is the link: ${diagramLink}`);
  }
}
