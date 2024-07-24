import { IParserService } from "../../services/parsers/IParserService";

export interface IProcessorProvider {
  add(parser: IParserService): void;
  remove(parser: IParserService): void;
  process(message: string): Promise<string>;
}
