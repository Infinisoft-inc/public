#!/bin/bash

# Define the project directories
project_dirs=("bridge" "hub" "log" "state")

# Create the output file for declarations
output_file="../typings/common.d.ts"
echo "" > "$output_file"

# Iterate over each project directory
for project_dir in "${project_dirs[@]}"; do
  echo "Generating declaration files for $project_dir..."

  # Run tsc to generate declaration files
  tsc -d "./$project_dir"/src/*.ts --downlevelIteration --emitDeclarationOnly --outFile "$output_file"

  echo "Declaration files generated for $project_dir"
done

echo "Declaration files generated for all projects in $output_file."
