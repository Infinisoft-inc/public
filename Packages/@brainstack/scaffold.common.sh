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

# Add reference path directive to TypeScript files in each project
for project in "${projects[@]}"; do
  # Define the path to the project folder
  project_path="./$project"

  # Find all TypeScript files recursively in the project folder excluding node_modules and dist directories
  ts_files=$(find "$project_path" -type f -name "*.ts" ! -path "*/node_modules/*" ! -path "*/dist/*")

  # Add the reference path directive to each TypeScript file
  for ts_file in $ts_files; do
    echo "/// <reference path=\"../typings/common.d.ts\" />" | cat - "$ts_file" > tmpfile && mv tmpfile "$ts_file"
    echo "Added reference path directive to $ts_file"
  done
done
