const fs = require('fs');
const path = require('path');

// Define the directory structure and file contents
const srcDir = './src';
const experienceDir = path.join(srcDir, 'experience');
const files = {
  'experience-type.ts': `
export enum ExperienceType {
  Sensory = 'Sensory',
  Emotional = 'Emotional',
  Cognitive = 'Cognitive',
  Perceptual = 'Perceptual',
  Aesthetic = 'Aesthetic',
  Spiritual = 'Spiritual',
  Social = 'Social',
  AlteredState = 'AlteredState'
}`,
  // ... (Other enum files and their content)
  'experience.ts': `
import { ExperienceType } from './experience-type';
// ... (Other imports)

export class Experience {
  // ... (Class properties and constructor)
}`
};

// Ensure the src directory exists
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir);
}

// Ensure the experience directory exists
if (!fs.existsSync(experienceDir)) {
  fs.mkdirSync(experienceDir);
}

// Create each TypeScript file with its content
Object.entries(files).forEach(([filename, content]) => {
  const filePath = path.join(experienceDir, filename);
  fs.writeFileSync(filePath, content);
});

console.log('Successfully generated Experience TypeScript files!');
