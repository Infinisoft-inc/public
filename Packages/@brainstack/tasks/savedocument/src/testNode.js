const SaveTextTaskNode = require('./SaveTextTaskNode');
const saveTextTaskNode = new SaveTextTaskNode('output.txt');
saveTextTaskNode.run('Hello, this is a test for Node.js!').catch(console.error);
