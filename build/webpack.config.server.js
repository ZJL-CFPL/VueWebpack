const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base') // webpack自定义公共配置
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 打包css为单独文件
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [{
      test: /\.styl/,
      use: [
        // {
        //   loader: MiniCssExtractPlugin.loader,
        //   options: {
        //     publicPath: '../../'
        //   }
        // },
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].[hash:8].css'
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"server"'
      }
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
