// create-cli-package.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter package name: ', (packageName) => {
  // Create package.json file
  const packageJson = {
    name: packageName,
    version: '1.0.0',
    description: 'A reusable CLI',
    main: 'cli.js',
    bin: {
      [packageName]: './cli.js',
    },
    dependencies: {
      rimraf: '^3.0.2',
      readline: '^1.3.0',
    },
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    author: '',
    license: 'ISC',
  };
  fs.writeFileSync(
    path.join(__dirname, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Add shebang line to entry point file
  const entryPointPath = path.join(__dirname, 'cli.js');
  const entryPointContent = fs.readFileSync(entryPointPath, 'utf-8');
  const newEntryPointContent = '#!/usr/bin/env node\n' + entryPointContent;
  fs.writeFileSync(entryPointPath, newEntryPointContent);

  console.log(`CLI package '${packageName}' created.`);
  rl.close();
});