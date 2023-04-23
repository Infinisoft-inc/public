#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const replacement_mapping = [];
const metaDescriptions = [];

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function generateToken(value) {
  return `{{${value.toUpperCase().replace(/[^A-Z0-9]/g, "_")}}}`;
}

async function promptForValueAndDescription() {
  while (true) {
    const value = await prompt(
      "Enter value to be replaced with token (leave blank to finish): "
    );
    if (!value) break;
    const token = generateToken(value);
    const description = await prompt(
      `Enter description for the token ${token}: `
    );
    replacement_mapping.push({ value, token });
    metaDescriptions.push({ token, value, description });
  }
}

function isExcluded(pathToFile, additionalExclusions) {
  return additionalExclusions.some((pattern) => pathToFile.match(pattern));
}

function* walkSync(dir, additionalExclusions) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const pathToFile = path.join(dir, file);
    if (!isExcluded(pathToFile, additionalExclusions)) {
      const isDirectory = fs.statSync(pathToFile).isDirectory();
      if (isDirectory) {
        yield* walkSync(pathToFile, additionalExclusions);
      } else {
        yield pathToFile;
      }
    }
  }
}

function replace_with_tokens(content) {
  for (const { value, token } of replacement_mapping) {
    content = content.replace(new RegExp(escapeRegExp(value), "g"), token);
  }
  return content;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function generate_template() {
  try {
    const source_directory = await prompt("Enter source directory: ");
    const template_directory = await prompt("Enter template directory: ");
    const metaDescriptions_filename = path.join(
      template_directory,
      "__template__meta__.json"
    );

    await promptForValueAndDescription();

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

    fs.mkdirSync(template_directory, { recursive: true });
    fs.writeFileSync(
      metaDescriptions_filename,
      JSON.stringify(metaDescriptions, null, 2)
    );

    // Iterate over each file in the source directory
    for (const source_path of walkSync(
      source_directory,
      additionalExclusions
    )) {
      // Compute the relative path from the source directory to the current file
      const relative_path = path.relative(source_directory, source_path);
      // Compute the corresponding path in the template directory
      const template_path = path.join(template_directory, relative_path);

      // Ensure that the target directory exists
      fs.mkdirSync(path.dirname(template_path), { recursive: true });

      // Read the content of the source file
      const content = fs.readFileSync(source_path, "utf8");
      // Perform token replacement on the content
      const template_content = replace_with_tokens(content);

      // Write the modified content to the template file
      fs.writeFileSync(template_path, template_content);
    }

    // Output a message indicating that the template generation is complete
    console.log("Template generation completed.");
    // Close the readline interface
    rl.close();
  } catch (err) {
    // Output any error that occurs during the process
    console.error(err);
    // Close the readline interface
    rl.close();
  }
}

// Run the script
generate_template();
