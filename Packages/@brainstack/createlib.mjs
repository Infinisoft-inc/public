import readline from "readline";
import fs from "fs";
import { join } from "path";
import { execSync } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

// Get list of available library types from the .templates directory
const templatePath = join(process.cwd(), ".templates");
const libraryTypes = fs.readdirSync(templatePath).filter((name) => {
  return fs.lstatSync(join(templatePath, name)).isDirectory();
});

// Define menu items with both name and value properties
const menuItems = [
  { name: "Library", value: "library" },
  { name: "React Library", value: "reactlib" },
  // Add more items here as needed
];

// Prompt user to choose a library type from the available options
function promptForLibraryType(callback) {
  console.log("Choose a library type:");
  menuItems.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name}`);
  });

  rl.question("Enter a number: ", (answer) => {
    const selectedIndex = parseInt(answer, 10) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= menuItems.length) {
      console.log("Invalid selection. Please try again.");
      promptForLibraryType(callback);
    } else {
      callback(menuItems[selectedIndex].value);
    }
  });
}

// Prompt user for package name
function promptForPackageName(libraryType, callback) {
  rl.question("Enter the name of your package: ", (packageName) => {
    const packagePath = join(process.cwd(), packageName);

    // Check if package directory already exists
    if (fs.existsSync(packagePath)) {
      console.log(`A directory with the name "${packageName}" already exists. Please choose a different name.`);
      promptForPackageName(libraryType, callback);
    } else {
      // Create package directory
      fs.mkdirSync(packagePath);

      // Copy template contents to the package directory
      const libraryPath = join(templatePath, libraryType);
      copyFolderRecursiveSync(libraryPath, packagePath);

      // Update package.json with the provided package name
      const packageJsonPath = join(packagePath, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
        packageJson.name = packageName;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2).replace(/LIBRARY/g, packageName));
      }

      // Install dependencies
      execSync("npm install", {
        cwd: packagePath,
        stdio: "inherit",
      });

      console.log(`Package "${packageName}" created successfully!`);
      rl.close();
    }
  });
}

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = join(source, file);
      const curTarget = join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}

// Start the program by prompting for the library type
promptForLibraryType((libraryType) => {
  promptForPackageName(libraryType, () => {});
});