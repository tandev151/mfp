const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ZipWebpackPlugin = require('zip-webpack-plugin'); // Add ZipWebpackPlugin
const TerserPlugin = require('terser-webpack-plugin'); // Add TerserPlugin for minification
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // Add CompressionWebpackPlugin
const commonWebpackConfig = require('./webpack.common.js');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodWebpackConfig = {
  mode: 'production',

  output: {
    filename: '[name].[chunkhash:5].bundle.js',
    clean: true,
    publicPath: 'http://mfe.local.vn/'
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
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
      },
      shared: packageJson.dependencies
    }),
    new ZipWebpackPlugin({
      filename: 'Archive_production.zip' // Name of the zip file
    })
  ]
};

module.exports = merge(commonWebpackConfig, prodWebpackConfig);
