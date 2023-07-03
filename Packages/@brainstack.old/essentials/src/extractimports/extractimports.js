import fs from 'fs';
import path from 'path';

const EXCLUDED_FILES = ['file1.js', 'file2.js']; // Add your excluded filenames here

export function extractImportsAndReadFiles(filename) {
  const localImports = [];

  function processFile(filepath, level) {
    if (level > 3) {
      return;
    }

    const fileContent = fs.readFileSync(filepath, 'utf-8');
    localImports.push(`// Filename: ${path.basename(filepath)}\n${fileContent}\n`);

    const importRegex = /import\s+.*\s+from\s+['"](.*)['"];?/g;
    let match;

    while ((match = importRegex.exec(fileContent))) {
      const importPath = match[1];
      if (!importPath.startsWith('.')) {
        // Exclude package imports
        continue;
      }

      const importFilepath = path.resolve(path.dirname(filepath), importPath);
      const importFileExt = path.extname(importFilepath);

      if (importFileExt === '.js' || importFileExt === '.jsx') {
        const basename = path.basename(importFilepath);
        if (isExcludedFile(basename)) {
          continue;
        }

        processFile(importFilepath, level + 1);
      }
    }
  }

  function isExcludedFile(filename) {
    return EXCLUDED_FILES.includes(filename);
  }

  const fileExt = path.extname(filename);
  if (fileExt === '.js' || fileExt === '.jsx') {
    const basename = path.basename(filename);
    if (isExcludedFile(basename)) {
      return '';
    }

    processFile(filename, 1);
  }

  return localImports.join('\n');
}
