const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const safeParser = require('postcss-safe-parser')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')
const env = require('../config/prod.env')

const getUglify = () => {
  return new TerserPlugin({
    terserOptions: {
      parse: {
        ecma: 8
      },
      compress: {
        ecma: 5,
        // 删除所有的 `console` 语句
        drop_console: true,
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        comparisons: false,
        inline: 2
      },
      mangle: {
        safari10: true
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true
      }
    },
    parallel: true,
    // Enable file caching
    cache: true,
    sourceMap: config.build.productionSourceMap
  })
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  optimization: {
    minimizer: [
      getUglify(),
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
      })
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
    ], // 是否进行代码压缩
    splitChunks: {
      chunks: 'all',
      maxSize: 0, //没有限制
      minSize: 30000, // 模块大于30k会被抽离到公共模块
      minChunks: 3, // 共享最少的chunk数，使用次数超过这个值才会被提取
      maxAsyncRequests: 5, //最多的异步chunk数
      maxInitialRequests: 5, // 最多的同步chunks数
      automaticNameDelimiter: '~', // 多页面共用chunk命名分隔符
      name: true,
      cacheGroups: {
        vendors: {
          test(file) {
            return (
              file.resource &&
              /\.js$/.test(file.resource) &&
              file.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
            )
          },
          name: 'vendor',
          chunks: 'all',
          priority: -10,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin(uglifyJsConfig),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { parser: safeParser, map: { inline: false } }
        : { parser: safeParser }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: (c1, c2) => {
        // Corrige bug da ordenação de assets.
        let orders = ['vendor', 'app']
        let o1 = orders.indexOf(c1.names[0])
        let o2 = orders.indexOf(c2.names[0])
        return o1 - o2
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      // sync: 'important',
      defaultAttribute: 'defer'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
