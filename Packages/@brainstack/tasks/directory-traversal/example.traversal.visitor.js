const DirectoryTraversalTask = require('./DirectoryTraversalTask');
const VisitorTask = require('./VisitorTask');

// Create instances of tasks
const directoryTraversalTask = new DirectoryTraversalTask();
const visitorTask = new VisitorTask();

// Attach event listeners to handle traversal events
directoryTraversalTask.on('file', (file) => visitorTask.handleFile(file));
directoryTraversalTask.on('directory', (dir) => visitorTask.handleDirectory(dir));

// Start the directory traversal
directoryTraversalTask.traverseDirectory('./some_directory');