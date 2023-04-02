import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const browserConfig = {
  input: 'src/SaveTextTaskBrowser.js',
  output: {
    file: 'dist/browser-bundle.js',
    format: 'umd',
    name: 'TextDocumentSaver',
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
  ],
};

const nodeConfig = {
  input: 'src/SaveTextTaskNode.js',
  output: {
    file: 'dist/node-bundle.js',
    format: 'cjs',
  },
  plugins: [
    json(),
  ],
  external: ['fs'],
};

export default [browserConfig, nodeConfig];
