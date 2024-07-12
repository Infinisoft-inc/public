import { IProcessorProvider } from "./IProcessorProvider";
import { IParserService } from "../../services/parsers/IParserService";

export class ProcessorProvider implements IProcessorProvider {
  private parsers: IParserService[] = [];

  constructor(parsers?: IParserService[]) {
    if (parsers) {
      this.parsers = parsers;
    }
  }

  add(parser: IParserService): void {
    this.parsers.push(parser);
  }

  remove(parser: IParserService): void {
    const index = this.parsers.indexOf(parser);
    if (index > -1) {
      this.parsers.splice(index, 1);
    }
  }

  async process(message: string) {
    const allPromises = this.parsers.map((parser) => parser.run(message));
    await Promise.all(allPromises);
  }
}
