const path = require('path')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development' // process.env可以读取npm run xxx 传过来的值
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 打包css为单独文件
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

const baseConfig = require('./webpack.config.base') // webpack自定义公共配置
const merge = require('webpack-merge')

const VueClientPlugin = require('vue-server-renderer/client-plugin') // 用于服务端渲染插件

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueClientPlugin()
]

let config
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  quiet: true, // necessary for FriendlyErrorsPlugin
  hot: true, // 热更新，配合webpack自带HotmoduleReplacementPlugin使用。实现页面不刷新，完成数据实时显示。若为false，页面会刷新
  historyApiFallback: {
    index: '/index.html'
  }
  // open:true,
}

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'template.html'),
        inject: true
      })
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js')
    },
    output: {
      filename: 'assets/js/[name].[chunkhash:8].js',
      publicPath: '/dist/'
    },
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
            // options: {
            //   publicPath: '../../'
            // }
          },
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
    plugins: defaultPlugins.concat([
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash:8].css',
        publicPath: '/dist/'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'template.html'),
        inject: true,
        minify: {
          html5: true,
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyCSS: true,
          minifyJS: true
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      })
    ]),
    optimization: {
      splitChunks: { // 分离公共包
        chunks: 'all',
        minSize: 0,
        // maxSize: 0,
        // minChunks: 2,
        // maxAsyncRequests: 5,
        // name: true,
        cacheGroups: {
          commons: {
            // test:/(react|react-dom)/,
            name: 'commons',
            chunks: 'all',
            minChunks: 2
          }
        }
      }
    }
  })
}
module.exports = config
