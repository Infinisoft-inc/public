import { Readable } from "stream";

export interface IModel {
  _ask(input: string, system?: string): Promise<string | null>;
  _askStream(input: string, system?: string): Promise<Readable>;
}
