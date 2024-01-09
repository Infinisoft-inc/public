import { Memory, TTLMemoryCell, IMemoryCell, ITransferThreshold } from '..';

describe('Memory Complex', () => {
  let originalDateNow: () => number;
  let fakeNow: number;
  let memory: Memory;
  const transferThreshold: ITransferThreshold = {
    attentionToShortTerm: 5,
    shortTermToLongTerm: 10,
  };

  beforeEach(() => {
    jest.useFakeTimers(); // Enable fake timers
    memory = new Memory(transferThreshold);
    originalDateNow = Date.now;
    fakeNow = originalDateNow();
    Date.now = jest.fn(() => fakeNow);
  });

  afterEach(() => {
    jest.useRealTimers(); // Disable fake timers after each test
    Date.now = originalDateNow;
  });

  it('should handle TTLMemoryCell correctly', () => {
    jest.setTimeout(10000); // Set a timeout of 10 seconds (adjust as needed)
    const memory = new Memory(transferThreshold);
    const ttlCell = new TTLMemoryCell('Some content', 1000); // 5 seconds TTL
    memory.addMemoryCell(ttlCell, 'attention');
    memory.startEvaluationCycle();
    // Advance time by 6000 milliseconds
    jest.useFakeTimers();
    fakeNow += 20000;
    jest.advanceTimersByTime(20000);

    setTimeout(() => {
      expect(memory.getMemoryCell(ttlCell.uid, 'attention')).toBeUndefined(); // Expecting the cell to be removed after expiration
      jest.useRealTimers();
      memory.stopEvaluationCycle();
    }, 5000);
  });

  // Test 2: Layer Transfers for TTLMemoryCell
  it('should transfer TTLMemoryCell between layers upon TTL expiration', () => {
    const ttlCell = new TTLMemoryCell('Content', 1000);
    memory.addMemoryCell(ttlCell, 'attention');
    jest.advanceTimersByTime(6000); // Fast-forward time

    setTimeout(() => {
      expect(memory.getMemoryCell(ttlCell.uid, 'shortTerm')).toEqual(ttlCell);
      jest.useRealTimers();
      memory.stopEvaluationCycle();
    }, 5000);
  });

  // Test 4: Weight Decrease Over Time
  it('should decrease weight of a memory item over time', () => {
    const item: IMemoryCell = {
      uid: '1',
      content: 'test',
      createdAt: new Date(),
      lastAccessed: new Date(),
      weight: 10,
      associations:[]
    };
    memory.addMemoryCell(item, 'attention');
    jest.advanceTimersByTime(10000); // Fast-forward time
    const updatedItem = memory.getMemoryCell('1', 'attention');

    setTimeout(() => {
      expect(updatedItem?.weight).toBeLessThan(10); // Expect weight to decrease
      jest.useRealTimers();
      memory.stopEvaluationCycle();
    }, 5000);
  });

  // Test 5: Retrieval of Non-Existent Memory Items
  it('should return undefined for non-existent memory items', () => {
    expect(memory.getMemoryCell('non-existent', 'attention')).toBeUndefined();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
