const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ZipWebpackPlugin = require('zip-webpack-plugin'); // Add ZipWebpackPlugin
const TerserPlugin = require('terser-webpack-plugin'); // Add TerserPlugin for minification
const commonWebpackConfig = require('./webpack.common.js');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN || 'http://localhost:8080';

const prodWebpackConfig = {
  mode: 'production',

  output: {
    filename: 'container.[name].[chunkhash:5].bundle.js',
    clean: true,
    publicPath: domain
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonWebpackConfig, prodWebpackConfig);
