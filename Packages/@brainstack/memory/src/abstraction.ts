// Memory system abstraction

import { IMemoryCell, UID } from "./cells/base";

export interface IMemoryLayer extends Iterable<IMemoryCell> {
  [uid: string]: IMemoryCell;
  [Symbol.iterator](): Iterator<IMemoryCell>;
}

export interface ITransferThreshold {
  attentionToShortTerm: number;
  shortTermToLongTerm: number;
}

export interface IMemory {
  addMemoryCell(item: IMemoryCell, layer: 'attention' | 'shortTerm' | 'longTerm'): IMemoryCell;
  getMemoryCell(uid: UID, layer: 'attention' | 'shortTerm' | 'longTerm'): IMemoryCell | undefined;
  updateMemoryCell(uid: UID, updatedContent: any, layer: 'attention' | 'shortTerm' | 'longTerm'): void;
  removeMemoryCell(uid: UID, layer: 'attention' | 'shortTerm' | 'longTerm'): void;
  transferCell(uid: UID, fromLayer: 'attention' | 'shortTerm' | 'longTerm', toLayer: 'attention' | 'shortTerm' | 'longTerm'): void;
  recall(query: string): IMemoryCell[];
  startEvaluationCycle(): void;
  stopEvaluationCycle(): void;
}