import { IMemory, ITransferThreshold } from './abstraction';
import { IMemoryCell, UID } from './cells/base';
import { TTLMemoryCell } from './cells/ttl';
import { mapToObject } from './utils/map2Object';

const TTL_EXTENSION_TIME_MS = 10000; // 10 seconds, for example

export class Memory implements IMemory {
  private attention: Map<UID, IMemoryCell> = new Map();
  private shortTerm: Map<UID, IMemoryCell> = new Map();
  private longTerm: Map<UID, IMemoryCell> = new Map();
  private transferThreshold: ITransferThreshold;
  private evaluationIntervalMs: number = 15000;
  private evaluationIntervalId: NodeJS.Timeout | null = null;

  constructor(transferThreshold: ITransferThreshold, private debug: boolean = false) {
    this.transferThreshold = transferThreshold;
  }

  public dump() {
    if (this.debug) {
      return {
        attention:mapToObject(this.attention),
        shortTerm:mapToObject(this.shortTerm),
        longTerm:mapToObject(this.longTerm),
        transferThreshold: this.transferThreshold,
        evaluationIntervalMs: this.evaluationIntervalMs,
      };
    }
   
    throw new Error('Debug mode disabled!')
  }

  addMemoryCell(
    item: IMemoryCell,
    layer: 'attention' | 'shortTerm' | 'longTerm'
  ) {
    this.getLayer(layer).set(item.uid, item);
    return item;
  }

  getMemoryCell(
    uid: UID,
    layer: 'attention' | 'shortTerm' | 'longTerm'
  ): IMemoryCell | undefined {
    const item = this.getLayer(layer).get(uid);
    if (item) {
      item.lastAccessed = new Date();
      item.weight += 1; // Increase weight on access
      this.evaluateItemTransfer(item, uid); // Evaluate for potential layer transfer
    }
    return item;
  }

  updateMemoryCell(
    uid: UID,
    updatedContent: any,
    layer: 'attention' | 'shortTerm' | 'longTerm'
  ): void {
    const item = this.getLayer(layer).get(uid);
    if (item) {
      item.content = updatedContent;
      item.lastAccessed = new Date();
    }
  }

  removeMemoryCell(
    uid: UID,
    layer: 'attention' | 'shortTerm' | 'longTerm'
  ): void {
    this.getLayer(layer).delete(uid);
  }

  transferCell(
    uid: UID,
    fromLayer: 'attention' | 'shortTerm' | 'longTerm',
    toLayer: 'attention' | 'shortTerm' | 'longTerm'
  ): void {
    const item = this.getLayer(fromLayer).get(uid);
    if (item) {
      this.getLayer(toLayer).set(uid, item);
      this.getLayer(fromLayer).delete(uid);
    }
  }

  private getLayer(
    name: 'attention' | 'shortTerm' | 'longTerm'
  ): Map<UID, IMemoryCell> {
    switch (name) {
      case 'attention':
        return this.attention;
      case 'shortTerm':
        return this.shortTerm;
      case 'longTerm':
        return this.longTerm;
    }
  }

  recall(query: string): IMemoryCell[] {
    const results: IMemoryCell[] = [];
    [this.attention, this.shortTerm, this.longTerm].forEach((layer) => {
      layer.forEach((item) => {
        if (this.matchesQuery(item, query)) {
          item.lastAccessed = new Date();
          item.weight += 1; // Increase weight on recall
          this.evaluateItemTransfer(item, item.uid); // Evaluate for potential layer transfer
          results.push(item);
        }
      });
    });
    return results;
  }

  private matchesQuery(item: IMemoryCell, query: string): boolean {
    return JSON.stringify(item).includes(query);
  }

  startEvaluationCycle(): void {
    if (this.evaluationIntervalId) clearInterval(this.evaluationIntervalId);
    this.evaluationIntervalId = setInterval(() => {
      this.evaluateMemory();
    }, this.evaluationIntervalMs);
  }

  stopEvaluationCycle(): void {
    if (this.evaluationIntervalId) clearInterval(this.evaluationIntervalId);
    this.evaluationIntervalId = null;
  }

  private evaluateMemory(): void {
    const now = new Date().getTime();
    const layers = {
      attention: this.attention,
      shortTerm: this.shortTerm,
      longTerm: this.longTerm,
    };

    Object.entries(layers).forEach(([layerName, layer]) => {
      layer.forEach((item, uid) => {
        const timeSinceLastAccess = now - item.lastAccessed.getTime();
        item.weight -= timeSinceLastAccess / 100000; // Decrease weight over time

        if (item instanceof TTLMemoryCell && item.isExpired()) {
          const threshold =
            layerName === 'shortTerm'
              ? this.transferThreshold.shortTermToLongTerm
              : this.transferThreshold.attentionToShortTerm;
          if (item.weight < threshold) {
            this.removeMemoryCell(
              uid,
              layerName as 'attention' | 'shortTerm' | 'longTerm'
            ); // Remove if below threshold
          } else {
            item.extendTTL(TTL_EXTENSION_TIME_MS); // Optionally extend TTL
            this.evaluateItemTransfer(item, uid); // Evaluate for transfer
          }
        } else {
          this.evaluateItemTransfer(item, uid); // Regular transfer logic for non-TTL items
        }
      });
    });
  }

  private evaluateItemTransfer(item: IMemoryCell, uid: UID): void {
    if (
      item.weight < this.transferThreshold.attentionToShortTerm &&
      this.attention.has(uid)
    ) {
      this.transferCell(uid, 'attention', 'shortTerm');
    } else if (
      item.weight < this.transferThreshold.shortTermToLongTerm &&
      this.shortTerm.has(uid)
    ) {
      this.transferCell(uid, 'shortTerm', 'longTerm');
    }
  }

  addAssociation(uid1: UID, uid2: UID) {
    const item1 = this.findMemoryCell(uid1);
    const item2 = this.findMemoryCell(uid2);

    if (item1 && item2) {
      item1.associations.push(uid2);
      item2.associations.push(uid1);
    }
  }

  // Method to retrieve all associations of a memory cell
  getAssociations(uid: UID): IMemoryCell[] {
    const item = this.findMemoryCell(uid);
    return item
      ? (item.associations
          .map((assocUid) => this.findMemoryCell(assocUid))
          .filter((item) => item !== undefined) as IMemoryCell[])
      : [];
  }

  // Helper method to find a memory cell across all layers
  private findMemoryCell(uid: UID): IMemoryCell | undefined {
    return (
      this.attention.get(uid) ||
      this.shortTerm.get(uid) ||
      this.longTerm.get(uid)
    );
  }
}
