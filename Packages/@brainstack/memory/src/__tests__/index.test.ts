import { ITransferThreshold } from '../abstraction';
import { IMemoryCell } from '../cells/base';
import { Memory } from '../implementation';
import { generateUUID } from '../utils/generateuuid';

describe('Memory', () => {
  let memory: Memory;
  const transferThreshold: ITransferThreshold = {
    attentionToShortTerm: 5,
    shortTermToLongTerm: 3,
  };

  beforeEach(() => {
    memory = new Memory(transferThreshold);
  });

  // Test addMemoryItem
  it('should add a memory item to the specified layer', () => {
    const item: IMemoryCell = {
      uid: generateUUID(),
      content: 'hu',
      createdAt: new Date(),
      lastAccessed: new Date(),
      weight: 0,
      associations: [],
    };
    memory.addMemoryCell(item, 'attention');
    expect(memory.getMemoryCell(item.uid, 'attention')).toEqual(item);
  });

  // Test getMemoryItem and check weight increase
  it('should retrieve and increase weight of a memory item', () => {
    const item: IMemoryCell = {
      uid: generateUUID(),
      content: 'some content',
      createdAt: new Date(),
      lastAccessed: new Date(),
      weight: 0,
      associations: [],
    };
    memory.addMemoryCell(item, 'attention');
    const initialWeight = item.weight;
    const retrievedItem = memory.getMemoryCell(item.uid, 'attention');
    expect(retrievedItem?.weight).toBeGreaterThan(initialWeight);
  });

  // Test updateMemoryItem
  it('should update a memory item', () => {
    const item: IMemoryCell = {
      uid: generateUUID(),
      content: 'hu',
      createdAt: new Date(),
      lastAccessed: new Date(),
      weight: 0,
      associations: [],
    };
    memory.addMemoryCell(item, 'attention');
    memory.updateMemoryCell(item.uid, 'new content', 'attention');
    const updatedItem = memory.getMemoryCell(item.uid, 'attention');
    expect(updatedItem?.content).toBe('new content');
  });

  // Test removeMemoryItem
  it('should remove a memory item', () => {
    const item: IMemoryCell = {
      uid: generateUUID(),
      content: 'hu',
      createdAt: new Date(),
      lastAccessed: new Date(),
      weight: 0,
      associations: [],
    };
    memory.addMemoryCell(item, 'attention');
    memory.removeMemoryCell(item.uid, 'attention');
    expect(memory.getMemoryCell(item.uid, 'attention')).toBeUndefined();
  });

  // Test recall functionality
  it('should recall memory items based on query', () => {
    const item1: IMemoryCell = {
      uid: generateUUID(),
      content: 'query cat',
      createdAt: new Date(),
      lastAccessed: new Date(),
      weight: 0,
      associations: [],
    };
    const item2: IMemoryCell = {
      uid: generateUUID(),
      content: 'query dog',
      createdAt: new Date(),
      lastAccessed: new Date(),
      weight: 0,
      associations: [],
    };
    memory.addMemoryCell(item1, 'attention');
    memory.addMemoryCell(item2, 'shortTerm');
    const results = memory.recall('query');
    expect(results).toContainEqual(item1);
    expect(results).toContainEqual(item2);
  });

  // Test transfer functionality
  it('should transfer a memory item between layers', () => {
    const item: IMemoryCell = {
      uid: generateUUID(),
      content: 'hnumeb 2',
      createdAt: new Date(),
      lastAccessed: new Date(),
      weight: 0,
      associations: [],
    };
    memory.addMemoryCell(item, 'attention');
    memory.transferCell(item.uid, 'attention', 'shortTerm');
    expect(memory.getMemoryCell(item.uid, 'shortTerm')).toEqual(item);
    expect(memory.getMemoryCell(item.uid, 'attention')).toBeUndefined();
  });

  // Test startEvaluationCycle and stopEvaluationCycle
  it('should start and stop evaluation cycle', () => {
    jest.useFakeTimers();
    memory.startEvaluationCycle();
    jest.advanceTimersByTime(15000); // Fast-forward time
    // Assertions to verify evaluation logic
    memory.stopEvaluationCycle();
    jest.useRealTimers();
  });
});
