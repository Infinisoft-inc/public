#!/bin/bash

# Create the project directory
mkdir text-document-saver
cd text-document-saver

# Initialize a new Node.js project
npm init -y

# Install necessary dependencies
npm install file-saver

# Create index.js, node.js, and browser.js files
cat << EOF > index.js
const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

if (isNode) {
  module.exports = require('./node');
} else {
  module.exports = require('./browser');
}
EOF

cat << EOF > node.js
const fs = require('fs');

class TextDocumentSaver {
  constructor(outputFilename) {
    this.outputFilename = outputFilename;
  }

  saveText(text) {
    try {
      fs.writeFileSync(this.outputFilename, text);
      console.log(\`Text saved successfully to \${this.outputFilename}\`);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  }
}

module.exports = TextDocumentSaver;
EOF

cat << EOF > browser.js
const { saveAs } = require('file-saver');

class TextDocumentSaver {
  constructor(outputFilename) {
    this.outputFilename = outputFilename;
  }

  saveText(text) {
    try {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, this.outputFilename);
      console.log(\`Text saved successfully to \${this.outputFilename}\`);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  }
}

module.exports = TextDocumentSaver;
EOF

# Create a .gitignore file to ignore node_modules
echo "node_modules" > .gitignore


echo "text-document-saver project set up complete."
