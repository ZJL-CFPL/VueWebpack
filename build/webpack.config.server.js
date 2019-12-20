const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base') // webpack自定义公共配置
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
// const ExtractPlugin = require('extract-text-webpack-plugin') // ssr单独提取css文件

const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  // new ExtractPlugin({
  //   filename: 'assets/css/style.[hash:8].css',
  //   allChunks: true
  // }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  }),
  new VueServerPlugin()
]

// if (isDev) {
// }

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
    rules: [
      // {
      //   test: /\.styl/,
      //   use: ExtractPlugin.extract({
      //     fallback: 'vue-style-loader',
      //     use: [
      //       'css-loader',
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           sourceMap: true
      //         }
      //       },
      //       'stylus-loader'
      //     ]
      //   })
      // }
      {
        test: /\.styl/,
        use: [
          // 'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins
})

module.exports = config
