#!/bin/bash

# List of directories to traverse
directories=("hub" "state" "bridge")

# Function to execute actions within each directory
execute_actions() {
  for directory in "${directories[@]}"; do
    cd "$directory" || exit

    # Gather a list of packages in package.json that begin with "@brainstack"
    package_list=$(jq -r '.dependencies | keys | .[]' package.json | grep '^@brainstack')

    # Update each package to the latest version
    for package in $package_list; do
      npm install "$package@latest"
    done

    # Generate type definitions
    npm run types

    # Build the project
    npm run build

    # Run tests
    npm run test

    # Increment the package version
    npm version patch

    # Publish the package
    npm publish --access=public

    # Tell a joke
    echo "Why don't scientists trust atoms? Because they make up everything!"
    
    cd ..
  done
}

# Call the function to execute actions
execute_actions
