import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/iBrainMicroStore.js', // Path to the entry file of your library
    output: [
      {
        file: 'dist/index.cjs.js', // Output file for CommonJS (Node.js) format
        format: 'cjs',
        exports: 'default'
      },
      {
        file: 'dist/index.esm.js', // Output file for ECMAScript Module format
        format: 'esm',
      },
      {
        file: 'dist/index.min.js', // Minified output file
        format: 'iife',
        plugins: [terser()],
        name: 'iBrainMicroStore',
        exports: 'default'
      },
    ],
    plugins: [
      resolve(), // Helps resolve Node.js-style imports
      commonjs(), // Converts CommonJS modules to ES modules
      terser(), // Minifies the output (for the minified output file)
    ],
  },
];
