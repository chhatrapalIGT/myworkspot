/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webPackConfigs = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...options.output,
  },
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(react-redux-toastr)\/).*/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader:
              options.mode === 'development'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: [
                  'legacy-js-api',
                  'import',
                  'global-builtin',
                  'color-functions',
                  'abs-percent',
                  'function-units',
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /images/,
        type: 'asset/resource',
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: 'asset/resource',
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([new Dotenv(), new MiniCssExtractPlugin()]),
  resolve: {
    modules: ['app', 'node_modules'],
    alias: {
      moment$: 'moment/moment.js',
    },
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'main', 'jsnext:main'],
  },
  devtool: false,
  target: 'web',
  performance: options.performance || {},
});

module.exports = webPackConfigs;
