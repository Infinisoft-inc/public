const fs = require('fs');
const path = require('path');

// The new page information
const pageName = 'ChatWidget';
const pageTitle = 'Chat Widget';
const pageRoute = '/chat-widget';

// Path to the src directory and pages directory
const srcPath = path.join(__dirname, 'src');
const pagesPath = path.join(srcPath, 'pages');

// Check if the pages directory exists, if not create it
if (!fs.existsSync(pagesPath)) {
  fs.mkdirSync(pagesPath);
}

// Create a new directory for the page inside the pages directory
const pagePath = path.join(pagesPath, pageName);
fs.mkdirSync(pagePath);

// Generate the content for the new page file (ChatWidget.js)
const pageContent = `
import React, { useState } from 'react';

const ${pageName} = () => {
  // Chat Widget content...
};

export default ${pageName};
`;

// Write the page file into the new directory
fs.writeFileSync(path.join(pagePath, `${pageName}.js`), pageContent);

// Update the menu.js file to include the new menu item
const menuPath = path.join(srcPath, 'config', 'app-menu.jsx');
const menuContent = fs.readFileSync(menuPath, 'utf8');
const newMenuItem = `{ title: '${pageTitle}', route: '${pageRoute}' },`;
const updatedMenuContent = menuContent.replace('// menu-items', `// menu-items\n  ${newMenuItem}`);
fs.writeFileSync(menuPath, updatedMenuContent);

// Update the routes.js file to include the new route
const routesPath = path.join(srcPath, 'config', 'app-route.jsx');
const routesContent = fs.readFileSync(routesPath, 'utf8');
const newRoute = `{\n  path: '${pageRoute}',\n  component: ${pageName},\n},`;
const updatedRoutesContent = routesContent.replace('// routes', `// routes\n${newRoute}`);
fs.writeFileSync(routesPath, updatedRoutesContent);

console.log('Scaffold script completed successfully. New page created.');
