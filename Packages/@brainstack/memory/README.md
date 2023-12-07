@brainstack/memory
# Memory Operations

### Adding Memory Items

To incorporate new memory items into the attention layer, follow these steps:

```javascript
const uid = memory.addMemoryItem({ note: 'Remember to buy milk' });
```

### Retrieving and Updating Memory Items

Retrieve and make updates to memory items using their unique UID:

```javascript
const memoryItem = memory.getMemoryItem(uid);
console.log(memoryItem.content); // Output: { note: 'Remember to buy milk' }

memory.updateMemoryItem(uid, { note: 'Remember to buy milk and bread' });
```

### Transferring Memory Items

If necessary, manually transfer memory items between layers:

```javascript
memory.transferMemoryItem(uid, memory.attention, memory.shortTerm);
```

### Subscribing to Recall Notifications

Stay informed by subscribing to notifications when a memory item is recalled:

```javascript
memory.subscribeToRecall((item) => {
  console.log(`Recalled memory item: ${JSON.stringify(item.content)}`);
});
```

### Searching for Memory Items

Search for memory items containing a specific query:

```javascript
const searchResults = memory.recallMemory('milk');
searchResults.forEach((item) => {
  console.log(`Found item: ${JSON.stringify(item.content)}`);
});
```

### Stopping the Evaluation Cycle

If the periodic evaluation cycle is no longer needed, you can stop it:

```javascript
memory.stopEvaluationCycle();
```

## Contributions

Contributions to this project are greatly appreciated! Please submit issues and pull requests to the project repository.

## License

UNLICENSED for the moment.