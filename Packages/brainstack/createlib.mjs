import readline from "readline";
import fs from "fs";
import { join } from "path";
import { execSync } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the name of your package: ", (packageName) => {
  const packagePath = join(process.cwd(), packageName);

  // Step 1: Create package directory
  fs.mkdirSync(packagePath);

  // Step 2: Copy template contents to the package directory
  const templatePath = join(process.cwd(), ".template");
  copyFolderRecursiveSync(templatePath, packagePath);

  // Step 3: Update package.json with the provided package name
  const packageJsonPath = join(packagePath, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = packageName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Step 4: Install dependencies
  execSync("npm install", {
    cwd: packagePath,
    stdio: "inherit",
  });

  console.log(`Package "${packageName}" created successfully!`);
  rl.close();
});

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = join(source, file);
      const curTarget = join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}
