
![Alt text](Brainstack_Memory_Package_header.png)

# @brainstack/memory
_by Martin Ouimet mouimet@infinsoft.world_

## Introduction

The `@brainstack/memory` package is designed to emulate a dynamic and adaptive memory system for artificial intelligence applications. Its primary purpose is to provide a structured way to store, manage, and recall information, mimicking the cognitive processes of attention, short-term memory, and long-term memory. This system allows AI to dynamically handle data with varying lifespans and relevance, facilitating more human-like memory management.

## Getting Started

To get started with `@brainstack/memory`, install the package using your favorite package manager:

```bash
npm install @brainstack/memory
# or
yarn add @brainstack/memory
```

Then, you can import and use it in your project:

```javascript
import { Memory, BaseMemoryCell, TTLMemoryCell } from '@brainstack/memory';

// Initialize the memory system
const memory = new Memory(transferThreshold);
```

## Features

- **Layered Memory System**: Implements attention, short-term, and long-term memory layers for data storage and retrieval.
- **Memory Cells**: Data is stored in 'memory cells', which can be transferred between layers based on their relevance and age.
- **Associations**: Memory cells can be associated with each other, allowing for complex data relationships.
- **Time-To-Live (TTL) Cells**: Special memory cells that expire after a set time, useful for temporary data storage.
- **Dynamic Weighting**: Memory cells are weighted based on access frequency, influencing their transfer between memory layers.

## Memory Cell

A memory cell (`IMemoryCell`) represents the basic unit of storage in the memory system. Each cell has a unique identifier (`uid`), content, creation and last accessed timestamps, a weight for importance, and associations to other cells.

## Memory Layers

- **Attention**: The first level where new information is initially stored.
- **Short-Term**: For information that is accessed more frequently.
- **Long-Term**: For information that has proved to be relevant over time.

## API

- `addMemoryCell(item, layer)`: Adds a memory cell to a specified layer.
- `getMemoryCell(uid, layer)`: Retrieves a memory cell from a specified layer.
- `updateMemoryCell(uid, updatedContent, layer)`: Updates the content of a memory cell in a specified layer.
- `removeMemoryCell(uid, layer)`: Removes a memory cell from a specified layer.
- `transferCell(uid, fromLayer, toLayer)`: Transfers a memory cell from one layer to another.
- `recall(query)`: Retrieves memory cells across all layers that match a query.
- `startEvaluationCycle()`: Starts an evaluation cycle to regularly assess and update memory cells.
- `stopEvaluationCycle()`: Stops the ongoing evaluation cycle.

## Example Usage

### Basic Memory Cell Storage and Retrieval

```javascript
const memory = new Memory(transferThreshold);
const cell = new BaseMemoryCell({ content: 'Example data' });

memory.addMemoryCell(cell, 'attention');
const retrievedCell = memory.getMemoryCell(cell.uid, 'attention');
console.log(retrievedCell.content); // 'Example data'
```

### TTL Memory Cell

```javascript
const ttlCell = new TTLMemoryCell({ content: 'Temporary data' }, 10000);
memory.addMemoryCell(ttlCell, 'shortTerm');

// After 10 seconds, ttlCell will be expired and can be removed or transferred.
```

### Memory Transfer and Reinforcement

The memory transfer and reinforcement mechanism in the `@brainstack/memory` system, particularly the ability for a memory cell to be recalled from Long-Term Memory (LTM) back to Attention, is a crucial aspect of dynamic memory management. This process mimics cognitive functions where frequently recalled or currently relevant information is brought to the forefront of attention, even if it was previously stored in LTM. Here's an explanation of how this process can be implemented and function:

1. **Weight Adjustment**:
   - Every time a memory cell is accessed (during a recall operation), its weight is increased. This increase signifies the memory cell's relevance or importance based on its usage frequency.

2. **Layer Evaluation and Transfer**:
   - The system regularly evaluates memory cells in each layer. This evaluation can be based on factors like weight (signifying usage frequency or importance) and last accessed time.
   - Memory cells in LTM with a weight exceeding a certain threshold may indicate their current relevance. These cells can be candidates for transfer back to a more immediate memory layer, like Attention or Short-Term Memory (STM).

3. **Recall and Transfer Mechanism**:
   - When a memory cell is recalled, it's not only fetched from its current layer, but the system also assesses whether it should be moved to a different layer.
   - If a cell in LTM is recalled and has a high weight, indicating frequent use or current relevance, it can be transferred back to the Attention layer. This ensures that highly relevant or frequently accessed information is readily available, mimicking the human ability to quickly recall important or often-used information.

### Example Scenario

Imagine a memory cell in LTM that holds information accessed only occasionally over a long period. Suddenly, this cell's information becomes highly relevant, and it's accessed frequently. The system increases the cell's weight with each access.

During the next evaluation cycle, the system notices this increased weight. Recognizing the cell's newfound importance, it transfers the cell from LTM back to the Attention layer. This transfer makes the cell more accessible for future recalls, reflecting its current significance.

### Implementation in `@brainstack/memory`

In your existing system, this process could be implemented in the `evaluateItemTransfer` method, where you can add logic to check if a memory cell in LTM has a weight above a certain threshold. If it does, the cell can be transferred back to the Attention layer:

```javascript
private evaluateItemTransfer(item: IMemoryCell, uid: UID): void {
  // Logic for transferring from LTM to Attention
  if (item.weight > someHighThreshold && this.longTerm.has(uid)) {
    this.transferCell(uid, 'longTerm', 'attention');
  } else {
    // Existing transfer logic...
  }
}
```

This dynamic transfer mechanism ensures that the AI's memory system remains adaptive and contextually relevant, similar to human memory processes.


