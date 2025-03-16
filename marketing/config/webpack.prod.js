const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonWebpackConfig = require('./webpack.common.js');
const packageJson = require('../package.json');

const prodWebpackConfig = {
  mode: 'production',

  output: {
    // filename: '[name:1].[chunkhash:1].js',
    filename: '[name].[chunkhash:5].bundle.js',

    clean: true
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap.js'
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonWebpackConfig, prodWebpackConfig);
