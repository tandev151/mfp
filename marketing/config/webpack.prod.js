const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonWebpackConfig = require('./webpack.common.js');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN || 'http://localhost:8081/'; // Default to localhost for testing
const prodWebpackConfig = {
  mode: 'production',

  output: {
    // filename: '[name:1].[chunkhash:1].js',
    filename: 'marketing.[name].[chunkhash:5].bundle.js',
    // publicPath: 'marketing/latest/',
    publicPath: `${domain}marketing/`, // Map to your host
    clean: true
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap.js'
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonWebpackConfig, prodWebpackConfig);
