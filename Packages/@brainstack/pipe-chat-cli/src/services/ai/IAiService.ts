export interface IAiService {
  ask(message: string, context: string): Promise<string>;
}
