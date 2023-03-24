#!/bin/bash

# Prompt for app name
read -p "Enter app name: " app_name

# Create app directory
mkdir $app_name
cd $app_name

# Create src directory and files
mkdir src
cd src
mkdir components pages services utils
cd components
mkdir my-component
cd my-component
touch index.js MyComponent.js MyComponent.css
cd ..
touch index.js
cd ../pages
mkdir home
cd home
touch index.js HomePage.js HomePage.css
cd ..
touch index.js
cd ../services
mkdir my-service
cd my-service
touch index.js MyService.js utils.js
cd ..
touch index.js
cd ../utils
touch index.js my-util.js
cd ../..
cp template/index.j src/index.js
pwd
# Create public directory and files
mkdir public
cd public
touch index.html favicon.ico manifest.json

# Create package.json
echo "{
  \"name\": \"$app_name\",
  \"version\": \"1.0.0\",
  \"description\": \"\",
  \"main\": \"src/index.js\",
  \"scripts\": {
    \"start\": \"node src/index.js\",
    \"dev\": \"nodemon src/index.js\",
    \"test\": \"jest\",
    \"build\": \"webpack\"
  },
  \"keywords\": [],
  \"author\": \"\",
  \"license\": \"MIT\",
  \"dependencies\": {
    \"express\": \"^4.17.1\",
    \"socket.io\": \"^4.3.1\",
    \"webpack\": \"^5.64.4\"
  },
  \"devDependencies\": {
    \"@babel/core\": \"^7.16.12\",
    \"@babel/preset-env\": \"^7.16.11\",
    \"babel-loader\": \"^8.2.3\",
    \"eslint\": \"^8.6.0\",
    \"eslint-config-airbnb-base\": \"^16.0.0\",
    \"eslint-plugin-import\": \"^2.25.3\",
    \"jest\": \"^27.5.1\",
    \"nodemon\": \"^2.1.8\",
    \"prettier\": \"^2.5.1\",
    \"webpack-cli\": \"^4.9.1\"
  }
}" >  package.json

cd ..
# Copy over package.json and license files
cp template/LICENSE $app_name/LICENSE
cp template/package.json $app_name/package.json

# Initialize Git repository and add files
git init
git add .
git commit -m "Initial commit"

echo "Micro app scaffolded successfully!"