const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const portfinder = require('portfinder')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  // 开发环境下默认启用cache，在内存中对已经构建的部分进行缓存
  // 避免其他模块修改，但是该模块未修改时候，重新构建，能够更快的进行增量构建
  // 属于空间换时间的做法
  cache: true,
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: true, // 取代插件中的 new webpack.NamedModulesPlugin()
    namedChunks: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),

    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunksSortMode: 'none'
    }),
    new ScriptExtHtmlWebpackPlugin({
      // sync: 'important',
      defaultAttribute: 'defer'
    }),
    new AutoDllPlugin({
      debug: true,
      inject: true,
      filename: 'dll_[name].dll.js',
      path: './static/js',
      context: path.join(__dirname, '..'),
      entry: utils.getDllModuleEntrys()
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
