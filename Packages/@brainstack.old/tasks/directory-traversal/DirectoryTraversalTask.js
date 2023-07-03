const fs = require('fs').promises;
const path = require('path');
const { Task } = require("@brainstack/framework");

class DirectoryTraversalTask extends Task {
  constructor() {
    super();
  }

  // Asynchronous generator function for traversing directory
  async *traverseDirectory(directoryPath) {
    try {
      // Read the contents of the directory
      const entries = await fs.readdir(directoryPath, { withFileTypes: true });

      // Iterate through the entries in the directory
      for (const entry of entries) {
        // Construct the full path of the entry
        const entryPath = path.join(directoryPath, entry.name);

        // Check if the entry is a directory
        if (entry.isDirectory()) {
          // Yield the directory path
          yield { type: 'directory', path: entryPath };

          // Recursively traverse the subdirectory
          yield* this.traverseDirectory(entryPath);
        } else if (entry.isFile()) {
          // Yield the file path
          yield { type: 'file', path: entryPath };
        }
      }
    } catch (err) {
      // Handle error
      throw err;
    }
  }

  async run(input) {
    const results = [];
    for await (const entry of this.traverseDirectory(input.directoryPath)) {
      results.push(entry);
    }
    return { results };
  }
}

module.exports = DirectoryTraversalTask;
