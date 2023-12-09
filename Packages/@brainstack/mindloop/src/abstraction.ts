// Memory system abstraction

export type UID = number;

export interface IMemoryItem {
  uid: UID;
  content: any;
  createdAt: Date;
  lastAccessed: Date;
  referenceCount: number;
}

export interface IMemoryLayer {
  [uid: string]: IMemoryItem;
}

export interface ITransferThreshold {
  attentionToShortTerm: number;
  shortTermToLongTerm: number;
}

export interface IMemory {
  addMemoryItem(content: any, layer?: IMemoryLayer): UID;
  getMemoryItem(uid: UID, layer?: IMemoryLayer): IMemoryItem | undefined;
  updateMemoryItem(uid: UID, content: any, layer?: IMemoryLayer): void;
  removeMemoryItem(uid: UID, layer?: IMemoryLayer): void;
  transferMemoryItem(uid: UID, from: IMemoryLayer, to: IMemoryLayer): void;
  recallMemory(query: string): IMemoryItem[];
  subscribeToRecall(callback: (item: IMemoryItem) => void): void;
  startEvaluationCycle(): void;
  stopEvaluationCycle(): void;
}
