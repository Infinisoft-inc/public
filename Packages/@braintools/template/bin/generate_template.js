const fs = require('fs');
const path = require('path');

// Constants for tokens
const PROJECT_NAME_TOKEN = "{{PROJECT_NAME}}";
const AUTHOR_TOKEN = "{{AUTHOR}}";
const AUTHOR_EMAIL_TOKEN = "{{AUTHOR_EMAIL}}";

// Define strings to be replaced with tokens
const replacement_mapping = {
  "@brainstack/microstore": PROJECT_NAME_TOKEN,
  "Martin Ouimet": AUTHOR_TOKEN,
  "mouimet@infinisoft.dev": AUTHOR_EMAIL_TOKEN,
}

// Function to replace strings with tokens
function replace_with_tokens(content) {
  for (let [original, token] of Object.entries(replacement_mapping)) {
    content = content.replace(original, token);
  }
  return content;
}

// Function to generate template
function generate_template(source_dir, template_dir, metadata_file) {
  try {
    // Create the template directory if it doesn't exist
    fs.mkdirSync(template_dir, { recursive: true });

    // Save the replacement mapping to a metadata file
    fs.writeFileSync(metadata_file, JSON.stringify(replacement_mapping));

    // Iterate through the source directory
    for (const [root, file, pathToFile] of walkSync(source_dir)) {
      // Construct file paths
      const source_path = path.join(root, file);
      const relative_path = path.relative(source_dir, source_path);
      const template_path = path.join(template_dir, relative_path);

      // Create the directory structure in the template directory
      fs.mkdirSync(path.dirname(template_path), { recursive: true });

      // Read the file content and replace strings with tokens
      const content = fs.readFileSync(source_path, 'utf8');
      const template_content = replace_with_tokens(content);

      // Write the modified content to the template file
      fs.writeFileSync(template_path, template_content);
    }

    console.log("Template generation completed.");
  } catch (err) {
    console.error(err);
  }
}

// Function to recursively walk through a directory
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

// Define paths (customize as needed)
const source_directory = "microtest";
const template_directory = "template_microtest";
const metadata_filename = "template_microtest_metadata.json";

// Run the script
generate_template(source_directory, template_directory, metadata_filename);
