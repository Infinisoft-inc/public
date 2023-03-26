const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageName = '@brainstack/mock-api';
const packageDir = path.join(__dirname, 'mock-api');

// Create the package directory
fs.mkdirSync(packageDir, { recursive: true });

// Generate package.json content
const packageJson = {
  name: packageName,
  version: '1.0.0',
  description: 'A mock API server',
  main: 'index.js',
  bin: 'index.js',
  scripts: {
    start: 'node index.js',
  },
  dependencies: {
    express: '^4.17.1',
  },
  author: 'Brainstack',
  license: 'ISC',
};

// Write package.json file
fs.writeFileSync(
  path.join(packageDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Generate index.js content
const indexJs = `
#!/usr/bin/env node
const express = require('express');

class MockAPI {
  constructor({ port, responseCallback }) {
    this.port = port || 3000;
    this.responseCallback = responseCallback || (() => 'Thank you');
    this.app = express();

    // Middleware to parse JSON request body
    this.app.use(express.json());

    // Route to receive any POST request and use the response callback
    this.app.post('/api/mock', (req, res) => {
      const response = this.responseCallback(req.body);
      res.send(response);
    });
  }

  start() {
    // Start the server on the specified port
    this.app.listen(this.port, () => {
      console.log(\`Server is running on port \${this.port}\`);
    });
  }
}

// Create an instance of the MockAPI class with default options
const mockAPI = new MockAPI({});

// Start the server
mockAPI.start();
`;

// Write index.js file
fs.writeFileSync(path.join(packageDir, 'index.js'), indexJs);

// Install the express dependency
execSync('npm install express', { cwd: packageDir, stdio: 'inherit' });

// Output message
console.log('Scaffolding completed! To start the server, run:');
console.log(`cd ${path.relative(__dirname, packageDir)} && npm start`);
