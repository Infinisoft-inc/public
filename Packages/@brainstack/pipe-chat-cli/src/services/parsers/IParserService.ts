export interface IParserService {
  run(content: string): Promise<void>;
  shouldRun(content: string): boolean;
}
