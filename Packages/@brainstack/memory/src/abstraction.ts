// Memory system abstraction

export type UID = number;

export interface IMemoryItem {
  uid: UID;
  content: any;
  createdAt: Date;
  lastAccessed: Date;
  weight: number;
}

export interface IMemoryLayer extends Iterable<IMemoryItem> {
  [uid: string]: IMemoryItem;
}

export interface ITransferThreshold {
  attentionToShortTerm: number;
  shortTermToLongTerm: number;
}

export interface IMemory extends Iterable<IMemoryItem> {
  attention: IMemoryLayer;
  shortTerm: IMemoryLayer;
  longTerm: IMemoryLayer;
  evaluationIntervalMs: number;
  evaluationIntervalId: NodeJS.Timeout | null;
  addMemoryItem(content: any, layer?: IMemoryLayer): UID;
  getMemoryItem(uid: UID, layer?: IMemoryLayer): IMemoryItem | undefined;
  updateMemoryItem(uid: UID, content: any, layer?: IMemoryLayer): void;
  removeMemoryItem(uid: UID, layer?: IMemoryLayer): void;
  transferMemoryItem(uid: UID, from: IMemoryLayer, to: IMemoryLayer): void;
  recallMemory(query: string): IMemoryItem[];
  startEvaluationCycle(): void;
  stopEvaluationCycle(): void;

  [uid: UID]: IMemoryItem;
}