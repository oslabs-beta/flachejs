const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  // optimization: {
  //   minimize: false
  // },

  entry: {
    index: './src/flache.js'
  },

  output: {
    filename: 'flache.min.js',
    path: path.resolve(__dirname, 'dist'),
    // sourceMapFilename: 'flache.js.map',
    library: {
      name: 'flachejs',
      type: 'umd',
    }
  },

  externals: {
    localforage: {
      commonjs: 'localforage',
      commonjs2: 'localforage',
      amd: 'localforage',
      root: 'localforage',
    },

    md5: {
      commonjs: 'md5',
      commonjs2: 'md5',
      amd: 'md5',
      root: 'md5'
    }
  },
}