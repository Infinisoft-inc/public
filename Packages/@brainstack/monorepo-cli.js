#!/usr/bin/env node
const inquirer = require("inquirer");
const execa = require("execa");

const actions = [
  { name: "Build everything once", value: "buildAll" },
  { name: "Build one package", value: "buildOne" },
  { name: "Build and release all", value: "buildAndReleaseAll" },
  { name: "Build and release one package", value: "buildAndReleaseOne" },
  { name: "Add a new package", value: "addNewPackage" },
  { name: "Remove a package", value: "removePackage" },
  { name: "Add a new dependency to one package", value: "addDependencyToOne" },
  { name: "Add a new dependency to all packages", value: "addDependencyToAll" },
  { name: "Remove a dependency from one package", value: "removeDependencyFromOne" },
  { name: "Remove a dependency from all packages", value: "removeDependencyFromAll" },
];

const performAction = async (action) => {
  switch (action) {
    case "buildAll":
      await execa.command("lerna run build");
      break;
    case "buildOne":
      const { packageToBuild } = await inquirer.prompt([
        {
          type: "input",
          name: "packageToBuild",
          message: "Enter the package name:",
        },
      ]);
      await execa.command(`lerna run build --scope ${packageToBuild}`);
      break;
    case "buildAndReleaseAll":
      await execa.command("lerna run build");
      await execa.command("lerna publish --conventional-commits");
      break;
    case "buildAndReleaseOne":
      const { packageToRelease } = await inquirer.prompt([
        {
          type: "input",
          name: "packageToRelease",
          message: "Enter the package name:",
        },
      ]);
      await execa.command(`lerna run build --scope ${packageToRelease}`);
      await execa.command(`lerna publish --conventional-commits --scope ${packageToRelease}`);
      break;
    case "addNewPackage":
      console.log("Please create the package folder and files manually in the appropriate directory.");
      break;
    case "removePackage":
      console.log("Please remove the package folder and files manually from the appropriate directory.");
      break;
    case "addDependencyToOne":
      const { packageToAddDep, depName, depVersion } = await inquirer.prompt([
        {
          type: "input",
          name: "packageToAddDep",
          message: "Enter the package name:",
        },
        {
          type: "input",
          name: "depName",
          message: "Enter the dependency name:",
        },
        {
          type: "input",
          name: "depVersion",
          message: "Enter the dependency version:",
        },
      ]);
      await execa.command(`lerna add ${depName}@${depVersion} --scope ${packageToAddDep}`);
      break;
    case "addDependencyToAll":
      const { depNameAll, depVersionAll } = await inquirer.prompt([
        {
          type: "input",
          name: "depNameAll",
          message: "Enter the dependency name:",
        },
        {
          type: "input",
          name: "depVersionAll",
          message: "Enter the dependency version:",
        },
      ]);
      await execa.command(`lerna add ${depName
      await execa.command(`lerna add ${depNameAll}@${depVersionAll}`);
      break;
    case "removeDependencyFromOne":
      console.log("Please remove the dependency manually from the appropriate package.json file.");
      break;
    case "removeDependencyFromAll":
      console.log("Please remove the dependency manually from the package.json files in all packages.");
      break;
    default:
      console.log("Invalid action.");
  }
};

(async () => {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: actions,
    },
  ]);

  await performAction(action);
})();

