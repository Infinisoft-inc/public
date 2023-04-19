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
