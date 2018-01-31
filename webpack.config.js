const webpack = require('webpack');
const path = require('path');
const fileSystem = require('fs');
const env = require('./utils/env');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

// load the secrets
const alias = {};

const secretsPath = path.join(__dirname, (`secrets.${env.NODE_ENV}.js`));

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

if (fileSystem.existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}

const entries = ['popup', 'inject'/*, 'options'*/, 'background', 'inject/iframe'];

const options = {
  entry: {
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader',
        // exclude: /node_modules/,
        // loaders: [
        //   'style-loader',
        //   'css-loader?modules=true&sourceMap=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:8]',
        //   'postcss-loader?postcss={}',
        // ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            },
          },
          'postcss-loader',
        ],

      },
      {
        test: new RegExp(`\\.(${fileExtensions.join('|')})$`),
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre'],
        },
      },
    ],
  },
  resolve: {
    alias,
    extensions: fileExtensions.map(extension => (`.${extension}`)).concat(['.jsx', '.js', '.css']),
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(['build']),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    }),
    new CopyWebpackPlugin([{
      from: 'src/manifest.json',
      transform: content =>
        // generates the manifest file using the package.json informations
        Buffer.from(JSON.stringify({
          description: process.env.npm_package_description,
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString()),
        }))
      ,
    }, {
      from: 'src/img',
      to: 'img',
    }]),
    new WriteFilePlugin(),
  ],
};

entries.forEach((entry) => {
  options.entry[entry] = path.join(__dirname, 'src', `${entry}.jsx`);
  options.plugins.push(new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', `${entry}.html`),
    filename: `${entry}.html`,
    chunks: [entry],
  }));
});

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-eval-source-map';
}

module.exports = options;
