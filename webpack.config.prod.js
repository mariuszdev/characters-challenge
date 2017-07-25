const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/app.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
  },
  module: {
    rules: [
      {
       test: /\.(sa|c)ss$/,
       use: ExtractTextPlugin.extract({
         fallback: 'style-loader',
         use: ['css-loader?-autoprefixer', 'sass-loader'],
       }),
     },
   ],
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    new AssetsPlugin({
      filename: 'webpack-assets.json',
      path: path.resolve(__dirname, 'dist'),
    }),
    new ExtractTextPlugin({
      filename: 'style.[contenthash].css',
    }),
  ],
};
