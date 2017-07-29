const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-sprite-loader',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /src/,
        use: {
          loader: 'file-loader?name=public/fonts/[name].[ext]',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
       test: /\.(sa|c)ss$/,
       use: ExtractTextPlugin.extract({
         fallback: 'style-loader',
         use: [
           {
             loader: 'css-loader',
             options: {
               sourceMap: true,
               importLoaders: 2,
               minimize: true,
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
