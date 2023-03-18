// core/createPackage.js

const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function createPackage() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter package name: ", (packageName) => {
    const packagePath = path.join(__dirname, "..", packageName);

    if (fs.existsSync(packagePath)) {
      console.error(`Package '${packageName}' already exists.`);
      rl.close();
      return;
    }

    // Create package folder
    fs.mkdirSync(packagePath);

    // Initialize npm package
    execSync("npm init -y", { cwd: packagePath });

    // Create src folder and index.js file
    const srcPath = path.join(packagePath, "src");
    fs.mkdirSync(srcPath);
    fs.writeFileSync(path.join(srcPath, "index.js"), "");

    console.log(`Package '${packageName}' created.`);
    rl.close();
  });
}

module.exports = createPackage;
