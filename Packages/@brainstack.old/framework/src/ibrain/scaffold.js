const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const enumsDir = path.join(srcDir, 'enums');
const classesDir = path.join(srcDir, 'classes');

// Enum file names and content
const enumFiles = [
  { name: 'MentalStateType.ts', content: 'export enum MentalStateType {...}' },
  { name: 'FacultyType.ts', content: 'export enum FacultyType {...}' },
  { name: 'TriggerType.ts', content: 'export enum TriggerType {...}' },
  { name: 'AttentionalControl.ts', content: 'export enum AttentionalControl {...}' },
  { name: 'AttentionalShiftType.ts', content: 'export enum AttentionalShiftType {...}' },
  { name: 'AttentionOrientingStage.ts', content: 'export enum AttentionOrientingStage {...}' }
];

// Class file names and content
const classFiles = [
  { name: 'MentalFaculty.ts', content: 'export class MentalFaculty {...}' },
  { name: 'Attention.ts', content: 'export class Attention {...}' },
  { name: 'AttentionalShift.ts', content: 'export class AttentionalShift {...}' },
  { name: 'Trigger.ts', content: 'export class Trigger {...}' },
  { name: 'MentalState.ts', content: 'export class MentalState {...}' }
];

// Main index file content
const indexContent = `
import { MentalStateType } from './enums/MentalStateType';
// ... other imports

// ... main logic and example usage
`;

// Helper function to create directory if it doesn't exist
const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

// Create src, enums, and classes directories
createDirIfNotExists(srcDir);
createDirIfNotExists(enumsDir);
createDirIfNotExists(classesDir);

// Create enum files
enumFiles.forEach((file) => {
  fs.writeFileSync(path.join(enumsDir, file.name), file.content);
});

// Create class files
classFiles.forEach((file) => {
  fs.writeFileSync(path.join(classesDir, file.name), file.content);
});

// Create main index.ts file
fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

console.log('Directory structure and files successfully scaffolded!');