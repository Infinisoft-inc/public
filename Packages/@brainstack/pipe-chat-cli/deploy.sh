#!/bin/bash

# Ensure the package.json version is updated before publishing
echo "Updating package version..."
npm version patch

# Build the project
echo "Building the project..."
npm run build

# Publish the package to npm
echo "Publishing the package to npm..."
npm publish

# Output completion message
echo "Package @brainstack/pipe-chat-cli published successfully!"

# Instructions for testing the package
echo "You can now test the package using: npx @brainstack/pipe-chat-cli"