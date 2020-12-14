const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'react-pusher.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'reactPusher',
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true
  },
  externals: Object.keys(pkg.peerDependencies || {}),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{
      // Include ts, tsx, js, and jsx files.
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
