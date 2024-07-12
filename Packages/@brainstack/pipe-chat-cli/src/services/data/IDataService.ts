export interface IDataService {
  init(): Promise<void>;
  getContext(): Promise<string>;
  applyChanges(changes: string): Promise<void>;
}
