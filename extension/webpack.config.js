const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    devtools: './src/devtools/devtools.js',  // entry point for chrome dev tool
    panel: './src/client/index.js'  // entry point for react app
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  // devServer: {
  //   port: 3333,
  //   static: {
  //     directory: path.join(__dirname, 'src', 'client', 'components'),
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
      },
      {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'manifest.json',
          to: path.join(__dirname, './dist'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/devtools/devtools.html',
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/panel.html',
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
    }),
  ],
};