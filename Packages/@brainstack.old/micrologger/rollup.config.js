import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import strip from "rollup-plugin-strip";

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
        name: "iBrainMicroStoreReact",
      },
    ],
    plugins: [
      strip({
        // Specify options for the strip plugin here.
        // For example, to remove all comments:
        pattern: /^\s*($|\/\/[^\n]*|\/\*[\s\S]*?\*\/|```[\s\S]*?```)\s*$/g,
      }),
      resolve(), // Helps resolve Node.js-style imports
      terser(), // Minifies the output (for the minified output file)
    ],
  },
];
