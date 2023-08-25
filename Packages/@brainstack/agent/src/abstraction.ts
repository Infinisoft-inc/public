export interface IModel {
  _ask(input: string, system?: string): Promise<string | null>;
}
