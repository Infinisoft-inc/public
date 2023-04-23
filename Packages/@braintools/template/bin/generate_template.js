const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {welcome} = require("./welcome.js")


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const replacement_mapping = [];
const metaDescriptions = [];

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function generateToken(value) {
  return `{{${value.toUpperCase().replace(/[^A-Z0-9]/g, '_')}}}`;
}

async function promptForValueAndDescription() {
  while (true) {
    const value = await prompt('Enter value to be replaced with token (leave blank to finish): ');
    if (!value) break;
    const token = generateToken(value);
    const description = await prompt(`Enter description for the token ${token}: `);
    replacement_mapping.push({ value, token });
    metaDescriptions.push({ token, value, description });
  }
}

async function generate_template() {
  try {
    const source_directory = await prompt('Enter source directory: ');
    const template_directory = await prompt('Enter template directory: ');
    const metaDescriptions_filename = path.join(template_directory, '__template__meta__.json');

    await promptForValueAndDescription();

    fs.mkdirSync(template_directory, { recursive: true });
    fs.writeFileSync(metaDescriptions_filename, JSON.stringify(metaDescriptions, null, 2));

    for (const [root, file, pathToFile] of walkSync(source_directory)) {
      const source_path = path.join(root, file);
      const relative_path = path.relative(source_directory, source_path);
      const template_path = path.join(template_directory, relative_path);

      fs.mkdirSync(path.dirname(template_path), { recursive: true });

      const content = fs.readFileSync(source_path, 'utf8');
      const template_content = replace_with_tokens(content);

      fs.writeFileSync(template_path, template_content);
    }

    console.log('Template generation completed.');
    rl.close();
  } catch (err) {
    console.error(err);
    rl.close();
  }
}

function* walkSync(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const pathToFile = path.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) {
      yield* walkSync(pathToFile);
    } else {
      yield [dir, file, pathToFile];
    }
  }
}

function replace_with_tokens(content) {
  for (const { value, token } of replacement_mapping) {
    content = content.replace(new RegExp(escapeRegExp(value), 'g'), token);
  }
  return content;
}

// Escape special characters for use in regular expression
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

welcome("Generate Template","A Template generating tools")
// Run the script
generate_template();
