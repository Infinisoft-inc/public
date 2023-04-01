#!/bin/bash

# Step 1: Set up the project and install dependencies
npm init -y
npm install file-saver

# Step 2: Create the tasks SaveTextTaskNode and SaveTextTaskBrowser
cat << EOF > SaveTextTaskNode.js
class SaveTextTaskNode {
  constructor(outputFilename) {
    this.outputFilename = outputFilename;
  }
  async run(text) {
    const fs = require('fs');
    try {
      fs.writeFileSync(this.outputFilename, text);
      console.log(\`Text saved successfully to \${this.outputFilename}\`);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  }
}
module.exports = SaveTextTaskNode;
EOF

cat << EOF > SaveTextTaskBrowser.js
class SaveTextTaskBrowser {
  constructor(outputFilename) {
    this.outputFilename = outputFilename;
  }
  async run(text) {
    const { saveAs } = require('file-saver');
    try {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, this.outputFilename);
      console.log(\`Text saved successfully to \${this.outputFilename}\`);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  }
}
module.exports = SaveTextTaskBrowser;
EOF

# Step 3: Create test scripts for both Node.js and browser environments
cat << EOF > testNode.js
const SaveTextTaskNode = require('./SaveTextTaskNode');
const saveTextTaskNode = new SaveTextTaskNode('output.txt');
saveTextTaskNode.run('Hello, this is a test for Node.js!').catch(console.error);
EOF

cat << EOF > testBrowser.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test SaveTextTaskBrowser</title>
  <script src="./SaveTextTaskBrowser.js"></script>
</head>
<body>
  <button onclick="testSaveTextTaskBrowser()">Save Text</button>
  <script>
    function testSaveTextTaskBrowser() {
      const saveTextTaskBrowser = new SaveTextTaskBrowser('output.txt');
      saveTextTaskBrowser.run('Hello, this is a test for the browser!');
    }
  </script>
</body>
</html>
EOF

# Step 4: Run the Node.js test script
node testNode.js

# Step 5: Serve the browser test script with an HTTP server and open in a web browser
npx http-server . -o testBrowser.html
