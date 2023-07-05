const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Define the list of folders to search
const folders = ['bridge', 'config', 'hub', 'core', 'log', 'state'];

// Define the dependency to update
const dependency = '@brainstack';

// Loop through each folder
folders.forEach(async (folder) => {
  try {
    // Check if the package.json file exists
    const packageJsonPath = path.join(folder, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      // Read the package.json file
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

      // Update the dependency
      if (packageJson.dependencies && packageJson.dependencies[dependency]) {
        const command = `cd ${folder} && npm install ${dependency}@latest`;
        const { stdout } = await exec(command);
        console.log(`Updated ${dependency} in ${folder}`);
      } else {
        console.log(`No ${dependency} dependency found in ${folder}`);
      }
    } else {
      console.log(`No package.json found in ${folder}`);
    }
  } catch (err) {
    console.error(`Failed to update ${dependency} in ${folder}:`, err);
  }
});