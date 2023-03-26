const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js', // Main entry point of the library
  output: {
    path: __dirname + '/dist', // Output directory
    filename: 'ibrain-voice.min.js', // Output filename
    library: 'iBrainVoice', // Library name exposed to the users
    libraryTarget: 'umd', // Universal module definition
    globalObject: 'this', // Ensures compatibility with various environments
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel to JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Use preset for modern JavaScript
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()], // Use Terser for minimizing the code
  },
};
