const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/flache.js'
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'flacheClient',
      type: 'umd',
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:'index.html'
    })
  ],
}