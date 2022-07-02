const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    devtools: './src/pages/DevTools/index.js',  // entry point for chrome dev tool
    panel: './src/pages/Panel/index.js'  // entry point for react app
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  devServer: {
    port: 3333,
    static: {
      directory: path.join(__dirname, 'src', 'pages', 'panel'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.jsx?$/,
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
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ['url-loader'],
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
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
        },
        {
          from: 'src/pages/Panel/assets',
          to: path.join(__dirname, './dist/assets'),
          force: true
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/DevTools/devtools.html',
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/Panel/panel.html',
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
    }),
  ],
};
