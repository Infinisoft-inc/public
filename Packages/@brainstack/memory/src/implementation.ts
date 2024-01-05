import { IMemoryItem, UID, IMemoryLayer } from './abstraction';

export class Memory implements IMemory, Iterable<IMemoryItem> {
  private attention: IMemoryLayer;
  private shortTerm: IMemoryLayer;
  private longTerm: IMemoryLayer;
  private evaluationIntervalMs: number = 15000;
  private evaluationIntervalId: NodeJS.Timeout | null = null;

constructor(){
  this.attention={} as any
  this.shortTerm={} as any
  this.longTerm={} as any
}

  public addMemoryItem(
    content: any,
    layer: IMemoryLayer = this.attention
  ): UID {
    const uid: UID = Memory.getNextUid();
    const timestamp = new Date();
    const memoryItem: IMemoryItem = {
      uid,
      content,
      createdAt: timestamp,
      lastAccessed: timestamp,
      weight: 0,
    };
    layer[uid] = memoryItem;
    return uid;
  }

  public getMemoryItem(uid: UID): IMemoryItem | null {
    // Retrieve the memory item from all layers
    return this.attention[uid] || this.shortTerm[uid] || this.longTerm[uid];
  }

  public updateMemoryItem(uid: UID, content: any): void {
    // Update content within memory item across all layers
    if (this.attention[uid]) this.attention[uid].content = content;
    if (this.shortTerm[uid]) this.shortTerm[uid].content = content;
    if (this.longTerm[uid]) this.longTerm[uid].content = content;
    // Update lastAccessed and increment referenceCount
  }

  public transferMemoryItem(
    uid: UID,
    from: IMemoryLayer,
    to: IMemoryLayer
  ): void {
    // Transfer memory items between layers validated by reference count
  }

  public removeMemoryItem(uid: UID): void {
    // Remove the memory item from all layers
    delete this.attention[uid];
    delete this.shortTerm[uid];
    delete this.longTerm[uid];
  }

  public recallMemory(query: string): IMemoryItem[] {
    // Search for memory items containing the query across all layers
    // Return match results
    throw new DOMException('Not Implemented');
  }

  public startEvaluationCycle(): void {
    // Begin the periodic evaluation cycle for memory management
    if (this.evaluationIntervalId) clearInterval(this.evaluationIntervalId);
    this.evaluationIntervalId = setInterval(
      this.evaluateMemory.bind(this),
      this.evaluationIntervalMs
    );
  }

  public stopEvaluationCycle(): void {
    // Stop the periodic evaluation cycle if needed
    if (this.evaluationIntervalId) clearInterval(this.evaluationIntervalId);
  }

  private evaluateMemory(): void {
    const now = Date.now();
    const forgettingRate = 0.01; // forgetting rate in minutes
    const decayRate = 0.9; // decay rate for memory strength
    const boostRate = 1.5; // boost rate for memory strength
    // Evaluate memory items in attention layer
    for (const item of this.attention) {
      const age = (now - item.lastAccessed.getTime()) / 1000; // age in seconds
      const weight = Math.pow(1 - age / forgettingRate, decayRate);
      item.weight = weight;
    }
    // Evaluate memory items in short-term layer
    for (const item of this.shortTerm) {
      const age = (now - item.lastAccessed.getTime()) / 1000; // age in seconds
      const weight = Math.pow(1 - age / forgettingRate, decayRate);
      item.weight = weight;
    }
    // Evaluate memory items in long-term layer
    for (const item of this.longTerm) {
      const age = (now - item.lastAccessed.getTime()) / 1000; // age in seconds
      const weight = Math.pow(1 - age / forgettingRate, decayRate);
      item.weight = weight;
    }
    // Recall memory items with the highest weight
    const recallItems = [];
    for (const item of this.attention) {
      if (item.weight > 0) {
        recallItems.push(item);
      }
    }
    for (const item of this.shortTerm) {
      if (item.weight > 0) {
        recallItems.push(item);
      }
    }
    for (const item of this.longTerm) {
      if (item.weight > 0) {
        recallItems.push(item);
      }
    }
    this.recallMemory(recallItems);
  }

  private static getNextUid(): UID {
    // Placeholder for generating unique identifiers incrementally
    return 0;
  }

  // Implement the iterator for IMemoryLayer
  [Symbol.iterator](): Iterator<IMemoryItem> {
    return new MemoryIterator(this.attention);
  }
}

// Extend the IMemoryLayer interface to return the iterator

// Implementing the iterator for IMemory
export class MemoryIterator implements Iterator<IMemoryItem> {
  private memory: IMemoryLayer;
  private currentUid: UID | null = null;

  constructor(memory: IMemoryLayer) {
    this.memory = memory;
  }

  next(): IteratorResult<IMemoryItem> {
    const memoryItem = this.getNextMemoryItem();
    if (memoryItem) {
      return { value: memoryItem, done: false };
    } else {
      return { value: null as any, done: true };
    }
  }

  private getNextMemoryItem(): IMemoryItem | null {
    const nextUid =
      this.currentUid !== null ? this.findNextUid() : this.findFirstUid();
    if (nextUid !== null) {
      this.currentUid = nextUid;
      return this.memory.getMemoryItem(nextUid);
    } else {
      return null;
    }
  }

  private findFirstUid(): UID | null {
    for (const uid in this.memory) {
      if (this.memory.hasOwnProperty(uid)) {
        return parseInt(uid);
      }
    }
    return null;
  }

  private findNextUid(): UID | null {
    let foundCurrentUid = false;
    for (const uid in this.memory) {
      if (this.memory.hasOwnProperty(uid)) {
        if (foundCurrentUid) {
          return parseInt(uid);
        } else if (parseInt(uid) === this.currentUid) {
          foundCurrentUid = true;
        }
      }
    }
    return null;
  }
}

// Extend the IMemory interface to return the iterator
export interface IMemory {
  [Symbol.iterator](): Iterator<IMemoryItem>;
}

// Implement the iterator in the Memory class
Memory.prototype[Symbol.iterator] = function (): Iterator<IMemoryItem> {
  return new MemoryIterator(this);
};
