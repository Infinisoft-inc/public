// core/deletePackage.js

const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

function deletePackage() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter package name to delete: ", (packageName) => {
    const packagePath = path.join(process.cwd(), "..", packageName);

    if (!fs.existsSync(packagePath)) {
      console.error(`Package '${packageName}' does not exist.`);
      rl.close();
      return;
    }

    // Delete package folder
    rimraf.sync(packagePath);

    console.log(`Package '${packageName}' deleted.`);
    rl.close();
  });
}

module.exports = deletePackage;
