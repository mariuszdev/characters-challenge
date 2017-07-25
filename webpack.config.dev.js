const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src/app.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
       test: /\.(sa|c)ss$/,
       use: [
         {
           loader: 'style-loader',
         },
         {
           loader: 'css-loader',
           options: {
             sourceMap: true,
             importLoaders: 2,
           },
         },
         {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: (loader) => [
              require('autoprefixer')(),
            ],
          },
         },
         {
           loader: 'sass-loader',
           options: {
             sourceMap: true,
           },
         },
       ],
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
