import { Memory, IMemoryCell, BaseMemoryCell } from '..';

describe('Memory Recall', () => {
  let memory: Memory;

  beforeEach(() => {
    // Initialize Memory instance with appropriate transferThreshold
    memory = new Memory({ shortTermToLongTerm: 5, attentionToShortTerm: 10 });
  });

  afterEach(() => {
    // Cleanup or reset memory as needed
  });

  it('should retrieve memories matching a simple query', () => {
    // Create and add memory cells to different layers with relevant content
    const mockMemoryCell1: IMemoryCell = new BaseMemoryCell({
      content: 'This is an apple.',
      lastAccessed: new Date(),
      weight: 1,
      associations: [],
    });

    memory.addMemoryCell(mockMemoryCell1, 'attention');

    // Retrieve memories matching the query 'apple'
    const results = memory.recall('apple');

    // Verify that the results contain the relevant memory cell(s)
    expect(results).toContain(mockMemoryCell1);
  });

  it('should retrieve memories matching a complex query', () => {
    // Create and add memory cells to different layers with relevant content
    const mockMemoryCell1: IMemoryCell = new BaseMemoryCell({
      content: 'This is an apple.',
    });

    const mockMemoryCell2: IMemoryCell = new BaseMemoryCell({
      content: 'This is a banana.',
    });

    memory.addMemoryCell(mockMemoryCell1, 'attention');
    memory.addMemoryCell(mockMemoryCell2, 'shortTerm');

    // Retrieve memories matching the query 'apple' with associations
    const results = memory.recall('apple');

    // Verify that the results contain the relevant memory cell(s)
    expect(results).toContain(mockMemoryCell1);
    expect(results).not.toContain(mockMemoryCell2);
  });

  it('should correctly retrieve and update associations of memory cells', () => {
    // Create and add memory cells with complex associations
    const appleCell = new BaseMemoryCell({
      content: 'This is an apple.',
      associations: ['fruit', 'red', 'healthy'],
    });

    const bananaCell = new BaseMemoryCell({
      content: 'This is a banana.',
      associations: ['fruit', 'yellow', 'tropical'],
    });

    const orangeCell = new BaseMemoryCell({
      content: 'This is an orange.',
      associations: ['fruit', 'orange', 'vitamin C'],
    });

    memory.addMemoryCell(appleCell, 'attention');
    memory.addMemoryCell(bananaCell, 'shortTerm');
    memory.addMemoryCell(orangeCell, 'longTerm');

    // Recall with a query and verify initial associations
    let fruitResults = memory.recall('fruit');
    expect(fruitResults).toContain(appleCell);
    expect(fruitResults).toContain(bananaCell);
    expect(fruitResults).toContain(orangeCell);

    // Add a new association to appleCell and verify update
    appleCell.associations.push('snack');
    memory.updateMemoryCell(
      appleCell.uid,
      'Updated apple content',
      'shortTerm'
    );

    let snackResults = memory.recall('snack');
    expect(snackResults).toContain(appleCell);
    expect(snackResults).not.toContain(bananaCell);
    expect(snackResults).not.toContain(orangeCell);

    // Remove an association from bananaCell and verify update
    bananaCell.associations = bananaCell.associations.filter(
      (assoc) => assoc !== 'tropical'
    );

    let tropicalResults = memory.recall('tropical');
    expect(tropicalResults).toContain(bananaCell);

    // Test recall with multiple associations
    let healthyFruitResults = memory.recall('healthy');
    expect(healthyFruitResults).toContain(appleCell);
    expect(healthyFruitResults).not.toContain(bananaCell);
    expect(healthyFruitResults).not.toContain(orangeCell);
  });

  //   it('should update memory cell weight and lastAccessed during recall', () => {
  //     // Create and add a memory cell to a layer
  //     const mockMemoryCell: IMemoryCell = {
  //       uid: 'uid1',
  //       content: 'This is an apple.',
  //       lastAccessed: new Date(),
  //       weight: 1,
  //       associations: [],
  //     };

  //     memory.addMemoryCell(mockMemoryCell, 'attention');
  //     const initialWeight = mockMemoryCell.weight;
  //     const initialLastAccessed = mockMemoryCell.lastAccessed;

  //     // Recall the memory cell
  //     memory.recall('query');

  //     // Verify that the weight and lastAccessed properties have been updated
  //     expect(mockMemoryCell.weight).toBeGreaterThan(initialWeight);
  //     expect(mockMemoryCell.lastAccessed).toBeGreaterThan(initialLastAccessed);
  //   });

  //   it('should handle empty query', () => {
  //     // Create and add memory cells with relevant content
  //     const mockMemoryCell1: IMemoryCell = {
  //       uid: 'uid1',
  //       content: 'This is an apple.',
  //       lastAccessed: new Date(),
  //       weight: 1,
  //       associations: [],
  //     };

  //     const mockMemoryCell2: IMemoryCell = {
  //       uid: 'uid2',
  //       content: 'This is a banana.',
  //       lastAccessed: new Date(),
  //       weight: 1,
  //       associations: [],
  //     };

  //     memory.addMemoryCell(mockMemoryCell1, 'attention');
  //     memory.addMemoryCell(mockMemoryCell2, 'shortTerm');

  //     // Recall with an empty query
  //     const results = memory.recall('');

  //     // Verify that the results are empty
  //     expect(results).toHaveLength(0);
  //   });

  //   it('should handle no matching memories', () => {
  //     // Create and add memory cells with relevant content
  //     const mockMemoryCell1: IMemoryCell = {
  //       uid: 'uid1',
  //       content: 'This is an apple.',
  //       lastAccessed: new Date(),
  //       weight: 1,
  //       associations: [],
  //     };

  //     const mockMemoryCell2: IMemoryCell = {
  //       uid: 'uid2',
  //       content: 'This is a banana.',
  //       lastAccessed: new Date(),
  //       weight: 1,
  //       associations: [],
  //     };

  //     memory.addMemoryCell(mockMemoryCell1, 'attention');
  //     memory.addMemoryCell(mockMemoryCell2, 'shortTerm');

  //     // Recall with a query that has no matching memories
  //     const results = memory.recall('grape');

  //     // Verify that the results are empty
  //     expect(results).toHaveLength(0);
  //   });

  //   it('should handle multiple matching memories', () => {
  //     // Create and add memory cells with relevant content
  //     const mockMemoryCell1: IMemoryCell = {
  //       uid: 'uid1',
  //       content: 'This is an apple.',
  //       lastAccessed: new Date(),
  //       weight: 1,
  //       associations: [],
  //     };

  //     const mockMemoryCell2: IMemoryCell = {
  //       uid: 'uid2',
  //       content: 'This is another apple.',
  //       lastAccessed: new Date(),
  //       weight: 1,
  //       associations: [],
  //     };

  //     const mockMemoryCell3: IMemoryCell = {
  //       uid: 'uid3',
  //       content: 'This is a banana.',
  //       lastAccessed: new Date(),
  //       weight: 1,
  //       associations: [],
  //     };

  //     memory.addMemoryCell(mockMemoryCell1, 'attention');
  //     memory.addMemoryCell(mockMemoryCell2, 'shortTerm');
  //     memory.addMemoryCell(mockMemoryCell3, 'longTerm');

  //     // Recall with a query that matches multiple memories
  //     const results = memory.recall('apple');

  //     // Verify that the results contain all matching memory cells
  //     expect(results).toContain(mockMemoryCell1);
  //     expect(results).toContain(mockMemoryCell2);
  //     expect(results).not.toContain(mockMemoryCell3);
  //   });

  // Add more test cases for recall based on different queries and scenarios
});
