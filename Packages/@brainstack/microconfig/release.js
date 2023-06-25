const { execSync } = require('child_process');

// Get the versioning option from command-line arguments
const versionOption = process.argv[2];

// Check if the version option is valid
if (!['patch', 'minor', 'major'].includes(versionOption)) {
  console.error('Invalid version option. Please use "patch", "minor", or "major".');
  process.exit(1);
}

try {
  // Update the package version
  execSync(`npm version ${versionOption} -m "Bump version to %s"`, { stdio: 'inherit' });

  // Push changes to the Git repository
  execSync('git push', { stdio: 'inherit' });
  execSync('git push --tags', { stdio: 'inherit' });

  // Publish the package to the npm registry
  execSync('npm publish', { stdio: 'inherit' });

  console.log('Release completed successfully!');
} catch (error) {
  console.error('Release failed:', error.message);
  process.exit(1);
}