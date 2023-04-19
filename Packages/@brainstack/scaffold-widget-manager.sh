#!/bin/bash

# Create the project folder
mkdir widget-manager
cd widget-manager

# Create package.json file
cat <<EOT > package.json
{
  "name": "@brainstack/widget-manager",
  "version": "1.0.0",
  "description": "A library for managing widgets in React applications",
  "main": "dist/index.js",
  "scripts": {
    "build": "rollup -c"
  },
  "dependencies": {
    "@brainstack/microstore-react": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "rollup": "latest",
    "rollup-plugin-peer-deps-external": "latest",
    "rollup-plugin-babel": "latest",
    "@babel/core": "latest",
    "@babel/preset-env": "latest",
    "@babel/preset-react": "latest"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
EOT

# Install dependencies
npm install

# Create src folder
mkdir src

# Insert code into src/index.js
cat <<EOT > src/index.js
import { WidgetManager, WidgetContext } from './WidgetManager';
import SampleComponent from './SampleComponent';

export { WidgetManager, WidgetContext, SampleComponent };
EOT

# Insert code into src/WidgetManager.js
cat <<EOT > src/WidgetManager.js
import React from 'react';
import { useMicroStore, useOn } from '@brainstack/microstore-react';
import Widget from './Widget';

export const WidgetContext = createMicrostore({
  widgets: {},
});

export const WidgetManager = ({ initialWidgets }) => {
  const { state, mutate } = useMicrostore({ widgets: initialWidgets });

  useOn('widget.add', (e, payload) => {
    const { event, widgetMeta } = payload;
    mutate((prev) => ({
      widgets: { ...prev.widgets, [event]: widgetMeta },
    }));
  });

  useOn('widget.close', (e, payload) => {
    const { widgetId } = payload;
    mutate((prev) => {
      const newWidgets = { ...prev.widgets };
      delete newWidgets[widgetId];
      return { widgets: newWidgets };
    });
  });

  return (
    <div className="widget-manager">
      {Object.entries(state.widgets).map(([event, widgetMeta]) => (
        <Widget
          key={widgetMeta.id}
          id={widgetMeta.id}
          title={widgetMeta.title}
          ContentComponent={widgetMeta.component}
          context={widgetMeta.context}
        />
      ))}
    </div>
  );
};
EOT

# Insert code into src/Widget.js
cat <<EOT > src/Widget.js
import React from 'react';
import { useMicroStore } from '@brainstack/microstore-react';

const Widget = ({ id, title, ContentComponent, context }) => {
  const { mutate } = useMicroStore();

  const onClose = () => {
    mutate.emit('widget.close', { widgetId: id });
  };

  return (
    <div className="widget-card">
      <div className="widget-header">
        <h2>{title}</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="widget-content">
        <ContentComponent {...context} />
          </div>
    </div>
  );
};

export default Widget;
EOT

# Insert code into src/SampleComponent.js
cat <<EOT > src/SampleComponent.js
import React from 'react';

const SampleComponent = ({ name, description, context }) => (
  <div>
    <h3>{name}</h3>
    <p>{description}</p>
    <p>File handle: {context.fileHandle}</p>
  </div>
);

export default SampleComponent;
EOT

# Create rollup.config.js for building the library
cat <<EOT > rollup.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from 'rollup-plugin-babel';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
  ],
  external: ['react', 'react-dom', '@brainstack/microstore-react']
};

export default config;
EOT

# Build the library
npm run build

# Display success message
echo "Widget management library has been successfully built and is ready for use!"