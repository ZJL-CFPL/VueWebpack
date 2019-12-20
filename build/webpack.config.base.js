const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader特殊声明调用
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const CreateVueLoaderOptions = require('./vue-loader.conf');

// const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production', // development || production
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:8000/' // 服务端渲染需要
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'assets': path.join(__dirname, '../client/assets/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // options: CreateVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          // name: '[path][name].[hash:6].[ext]'
          name: 'assets/img/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/media/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:6].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
}

module.exports = config
