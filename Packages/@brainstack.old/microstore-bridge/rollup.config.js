import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from 'rollup-plugin-terser';


export default [
  {
    input: "src/index.mjs", // Path to the entry file of your library
    output: [
      {
        file: "dist/index.cjs.min.js",
        format: "cjs",
        plugins: [terser()],
      },
      {
        file: "dist/index.esm.min.mjs", // Output file for ECMAScript Module format
        plugins: [terser()],
        format: "esm",
      },
      {
        file: "dist/index.umd.min.mjs", // Minified output file
        format: "umd",
        plugins: [terser()],
        name: "microstoreBridge",
      },
    ],
    plugins: [
      resolve(),
      commonjs()
    ],
  },
];
