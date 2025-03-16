const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonWebpackConfig = require('./webpack.common.js');
const packageJson = require('../package.json');

const devWebpackConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap'
      }
      // shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

module.exports = merge(commonWebpackConfig, devWebpackConfig);
