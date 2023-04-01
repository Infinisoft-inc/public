#!/bin/bash

# Create the project directory
mkdir text-document-saver
cd text-document-saver

# Initialize a new Node.js project
npm init -y

# Install necessary dependencies
npm install file-saver

# Install Rollup and its plugins
npm install rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-json jq
npm install @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-json

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

# Create a rollup.config.js file
cat << EOF > rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'TextDocumentSaver',
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
  ],
};
EOF

# Add a build script to package.json
jq '.scripts.build = "rollup -c"' package.json > package.json.tmp
mv package.json.tmp package.json

# Create a .gitignore file to ignore node_modules and the dist folder
echo "node_modules" > .gitignore
echo "dist" >> .gitignore

echo "text-document-saver project with Rollup set up complete."
