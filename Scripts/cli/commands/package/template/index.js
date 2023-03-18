const fs = require("fs");
const path = require("path");

// Create a directory if it doesn't already exist
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

// Create a file if it doesn't already exist
function createFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }
}

// Create the folder structure
module.exports = (rootPath) => {
  createDirectory(rootPath);

  const rootDir = path.join(rootPath, "micro-app");
  createDirectory(rootDir);

  const srcDir = path.join(rootDir, "src");
  createDirectory(srcDir);

  const componentsDir = path.join(srcDir, "components");
  createDirectory(componentsDir);

  const servicesDir = path.join(srcDir, "services");
  createDirectory(servicesDir);

  const utilsDir = path.join(srcDir, "utils");
  createDirectory(utilsDir);

  const storeDir = path.join(srcDir, "store");
  createDirectory(storeDir);

  const publicDir = path.join(rootDir, "public");
  createDirectory(publicDir);

  createFile(path.join(srcDir, "App.js"));
  createFile(path.join(srcDir, "App.test.js"));
  createFile(path.join(srcDir, "App.module.css"));
  createFile(path.join(srcDir, "index.js"));
  createFile(path.join(publicDir, "index.html"));
  createFile(path.join(publicDir, "favicon.ico"));
  createFile(path.join(rootDir, ".env"));
  createFile(path.join(rootDir, ".gitignore"));
  createFile(path.join(rootDir, "package.json"));
  createFile(path.join(rootDir, "README.md"));

  console.log(`Micro app folder structure created at ${rootDir}.`);
};
