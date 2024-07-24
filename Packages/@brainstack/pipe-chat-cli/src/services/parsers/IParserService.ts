export interface IParserService {
  run(content: string): Promise<void|string>;
  shouldRun(content: string): boolean;
}
