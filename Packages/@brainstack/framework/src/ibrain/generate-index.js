const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const enumsDir = path.join(srcDir, 'enums');
const classesDir = path.join(srcDir, 'classes');

// Generate export statements for a directory
const generateExports = (dir) => {
  const exportStatements = [];
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fileName = path.parse(file).name;
    const fileExt = path.parse(file).ext;
    if (fileExt === '.ts' && fileName !== 'index') {
      exportStatements.push(`export * from './${fileName}';`);
    }
  });
  return exportStatements.join('\n');
};

// Create index.ts files for the enums and classes directories
fs.writeFileSync(path.join(enumsDir, 'index.ts'), generateExports(enumsDir));
fs.writeFileSync(path.join(classesDir, 'index.ts'), generateExports(classesDir));

// Create index.ts file for the src directory
const srcIndexContent = `
export * from './enums';
export * from './classes';
`;
fs.writeFileSync(path.join(srcDir, 'index.ts'), srcIndexContent);

console.log('index.ts files have been successfully created with exports!');
