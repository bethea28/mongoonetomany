const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './index.jsx'
  ],
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: [/node_modules/]
    }]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
