#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {welcome} = require("./welcome.js")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function instantiateTemplate() {
  try {
    // Prompt for the source (template) directory
    const templateDir = await prompt('Enter source (template) directory: ');

    // Check if the template directory exists
    if (!fs.existsSync(templateDir)) {
      throw new Error(`Template directory "${templateDir}" does not exist.`);
    }

    // Determine the location of the __template__meta__.json file
    const metadataFile = path.join(templateDir, '__template__meta__.json');

    // Check if the __template__meta__.json file exists
    if (!fs.existsSync(metadataFile)) {
      throw new Error(`Metadata file "__template__meta__.json" is missing in the template directory.`);
    }

    const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
    const config = {};

    // Prompt for values to replace based on descriptions
    for (const { token, description } of metadata) {
      const value = await prompt(`Enter value for '${description}': `);
      config[token] = value;
    }

    // Prompt for the destination (output) directory
    const outputDir = await prompt('Enter destination (output) directory: ');

    fs.mkdirSync(outputDir, { recursive: true });

    fs.readdirSync(templateDir, { withFileTypes: true }).forEach(entry => {
      const entryPath = path.join(templateDir, entry.name);
      const relativePath = path.relative(templateDir, entryPath);
      const outputPath = path.join(outputDir, relativePath);

      if (entry.isDirectory()) {
        fs.mkdirSync(outputPath, { recursive: true });
      } else {
        let content = fs.readFileSync(entryPath, 'utf8');

        // Correctly replace tokens with values
        for (const [token, value] of Object.entries(config)) {
          content = content.replace(new RegExp(token, 'g'), value);
        }

        fs.writeFileSync(outputPath, content);
      }
    });

    console.log("Template instantiation completed.");
  } catch (err) {
    console.error(err.message);
  } finally {
    rl.close();
  }
}

// Run the script
welcome()
instantiateTemplate();
