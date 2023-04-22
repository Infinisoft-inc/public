const fs = require('fs');
const path = require('path');

function instantiateTemplate(templateDir, metadataFile, configFile, outputDir) {
  const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

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
        content = content.replace(token, value);
      }

      fs.writeFileSync(outputPath, content);
    }
  });

  console.log("Template instantiation completed.");
}

// Define paths (customize as needed)
const templateDirectory = "template_microtest";
const metadataFilename = "template_microtest_metadata.json";
const configFilename = "config.json";
const outputDirectory = "microtest_instance";
instantiateTemplate(templateDirectory, metadataFilename, configFilename, outputDirectory);
