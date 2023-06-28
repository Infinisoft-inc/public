#!/bin/bash

# Define the paths to the projects
projects=(
  "bridge"
  "hub"
  "log"
  "state"
)

# Create the typings folder
mkdir -p ./typings

# Copy or generate your common typings files into the typings folder

# Update TypeScript configurations in each project
for project in "${projects[@]}"; do
  # Define the path to the TypeScript configuration file
  tsconfig="./$project/tsconfig.json"

  # Add typings path to the TypeScript configuration
  jq '.compilerOptions.paths += { "common/*": ["../typings/common/*"] }' "$tsconfig" > tmpfile && mv tmpfile "$tsconfig"

  echo "Updated tsconfig.json in $project"
done
