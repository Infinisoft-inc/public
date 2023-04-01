const { execSync } = require("child_process");

function executeCommand(command) {
  try {
    const output = execSync(command, { stdio: "inherit" });
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    process.exit(1);
  }
}

console.log("Installing dependencies...");
executeCommand("npm ci");

// Uncomment the following lines if you have a build process
// console.log("Building the library...");
// executeCommand("npm run build");

console.log("Bumping package version...");
executeCommand("npm version patch");

console.log("Publishing package to npm...");
executeCommand("npm publish --dry-run");

// Uncomment the following lines if you're using git
// console.log("Pushing changes to git repository...");
// executeCommand("git add package.json");
// executeCommand('git commit -m "Bump version"');
// executeCommand("git push");

console.log("Deployment completed!");
