#!/bin/bash

# Define the available tools
tools=("buildall.sh" "clean.sh" "createlib.mjs" "generate_type_def.sh" "run_tests.sh" "update_jest_config.sh")

# Define the descriptions for each tool
descriptions=("Build all projects in the @brainstack package" 
              "Clean the build artifacts for all projects in the @brainstack package" 
              "Create a new library in the @brainstack package" 
              "Generate TypeScript declaration files for all projects in the @brainstack package"
              "Run unit tests for all projects in the @brainstack package"
              "Update Jest config for all applicable projects")

# Present the menu to the user
echo "Available tools:"
for i in "${!tools[@]}"; do 
  echo "$((i+1)). ${tools[$i]} - ${descriptions[$i]}"
done

# Prompt the user to choose a tool
echo ""
read -p "Enter the number of the tool you wish to run: " choice

# Validate the user's choice
if [[ "$choice" -lt 1 || "$choice" -gt "${#tools[@]}" ]]; then
  echo "Invalid choice. Please select a number between 1 and ${#tools[@]}."
  exit 1
fi

# Execute the chosen tool
echo ""
echo "Running ${tools[$((choice-1))]}..."

case ${tools[$((choice-1))]} in
  "createlib.mjs")
    node ./tools/createlib.mjs
    ;;
  "run_tests.sh")
    # Run tests for each project
    for project_dir in bridge hub log state; do
      echo ""
      echo "Running tests for $project_dir..."
      cd "$project_dir" || exit
      npm run test
      cd ..
    done
    ;;
  *)
    # Change to the tools directory and execute the script for all projects

    for project_dir in bridge hub log state; do
      echo ""
      echo "Running ${tools[$((choice-1))]} for $project_dir..."
      cd "$project_dir" || exit
      "../tools/${tools[$((choice-1))]}"
      cd ..
    done
    cd ..
    ;;
esac

echo ""
echo "${tools[$((choice-1))]} completed for all applicable projects."