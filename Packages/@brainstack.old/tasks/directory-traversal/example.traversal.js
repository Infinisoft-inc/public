const DirectoryTraversalTask = require('./DirectoryTraversalTask');

// Create an instance of the task
const directoryTraversalTask = new DirectoryTraversalTask();

// Input for the task
const input = {
  directoryPath: '..' // Replace with the actual directory path
};

// Execute the task
directoryTraversalTask.run(input)
  .then(output => {
    for (const entry of output.results) {
      console.log(`Type: ${entry.type}, Path: ${entry.path}`);
    }
  })
  .catch(err => {
    console.error(`Error: ${err.message}`);
  });
