const fs = require('fs');
const path = require('path');

class NodeCrudTask {
  constructor(directory) {
    this.directory = directory;
  }

  create(fileName, content) {
    const filePath = path.join(this.directory, fileName);
    fs.writeFileSync(filePath, content);
  }

  read(fileName) {
    const filePath = path.join(this.directory, fileName);
    return fs.readFileSync(filePath, 'utf8');
  }

  update(fileName, content) {
    this.create(fileName, content);
  }

  delete(fileName) {
    const filePath = path.join(this.directory, fileName);
    fs.unlinkSync(filePath);
  }
}


const nodeCrudTask = new NodeCrudTask('./data');
nodeCrudTask.create('example.txt', 'Hello, World!');
console.log(nodeCrudTask.read('example.txt'));
nodeCrudTask.update('example.txt', 'Updated Content');
// nodeCrudTask.delete('example.txt');
