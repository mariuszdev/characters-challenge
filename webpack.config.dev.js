const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src/app.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
       test: /\.(sa|c)ss$/,
       use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader?-autoprefixer',
        }, {
          loader: 'sass-loader',
        }],
     },
   ],
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new AssetsPlugin({
      filename: 'webpack-assets.json',
      path: path.resolve(__dirname, 'dist'),
    }),
  ],
};
