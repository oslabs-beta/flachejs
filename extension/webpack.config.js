const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    devtools: './src/pages/DevTools/',  // entry point for chrome dev tool
    panel: './src/pages/Panel/'  // entry point for react app
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  output: {
    path: path.join(__dirname, './src/pages/Panel/dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  
  devServer: {
    historyApiFallback: true,
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
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ['url-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, './src/pages/Panel/dist'),
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
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/DevTools/index.html',
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/Panel/index.html',
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
    }),
  ],
};
