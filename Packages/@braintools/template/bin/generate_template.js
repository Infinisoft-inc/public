#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function generate_template() {
  try {
    const source_directory = await prompt("Enter source directory: ");
    const template_directory = await prompt("Enter template directory: ");

    // Prompt for ignoring node_modules and dist
    const additionalExclusions = [];
    const ignoreDefaultDirsInput = await prompt(
      "Do you want to ignore node_modules and dist? (yes/no, default: yes): "
    );
    if (ignoreDefaultDirsInput === "" || ignoreDefaultDirsInput === "yes") {
      additionalExclusions.push("node_modules", "dist");
    }

    const addMoreExclusions =
      (await prompt("Add more exclusions? (yes/no): ")) === "yes";
    if (addMoreExclusions) {
      while (true) {
        const exclusion = await prompt(
          "Enter exclusion pattern (leave blank to finish): "
        );
        if (!exclusion) break;
        additionalExclusions.push(exclusion);
      }
    }

    // Utility function to check if a path should be excluded
    function isExcluded(pathToFile) {
      return additionalExclusions.some((pattern) => pathToFile.match(pattern));
    }

    // Utility function to recursively walk through a directory
    function* walkSync(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const pathToFile = path.join(dir, file);
        if (!isExcluded(pathToFile)) {
          const isDirectory = fs.statSync(pathToFile).isDirectory();
          if (isDirectory) {
            yield* walkSync(pathToFile);
          } else {
            yield pathToFile;
          }
        }
      }
    }

    // Create template directory
    fs.mkdirSync(template_directory, { recursive: true });

    // Generate template files
    for (const source_path of walkSync(source_directory)) {
      const relative_path = path.relative(source_directory, source_path);
      const template_path = path.join(template_directory, relative_path);

      fs.mkdirSync(path.dirname(template_path), { recursive: true });

      const content = fs.readFileSync(source_path, "utf8");
      fs.writeFileSync(template_path, content);
    }

    console.log("Template generation completed.");
    rl.close();
  } catch (err) {
    console.error(err);
    rl.close();
  }
}

// Run the script
generate_template();
