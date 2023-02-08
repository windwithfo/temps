/**
 * @file 部署配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path                     from 'path'
import Chalk                    from 'chalk'
import webpack                  from 'webpack'
import fs                       from 'fs-extra'
import { VueLoaderPlugin }      from 'vue-loader'
import { merge }                from 'webpack-merge'
import baseConfig               from './webpack.base.mjs'
import Html                     from 'html-webpack-plugin'
import CopyPlugin               from 'copy-webpack-plugin'
import config                   from './project.config.mjs'
import { CleanWebpackPlugin }   from 'clean-webpack-plugin'
import TerserJs                 from 'terser-webpack-plugin'
import Extract                  from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import ProgressBar              from 'progress-bar-webpack-plugin'
import CSSAssets                from 'css-minimizer-webpack-plugin'
import FriendlyErrors           from 'friendly-errors-webpack-plugin'

let manifest
try {
  manifest = fs.readJSONSync(process.cwd() + `/public/vendor-manifest.json`)
} catch (_) {
  console.log('no dll json')
}

const entry = config.view || [{ page: 'index', path: 'view/index' }]

const webpackConfig = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJs({
        parallel: true,
      }),
      new CSSAssets({})
    ],
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  },
  output: {
    path: path.join(process.cwd(), config.assetsRir),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: config.assetsPath
  },
  devtool: 'source-map',
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [Extract.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [Extract.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      }
    ]
  },
  stats: {
    children: false,
    chunks: false,
    modules: false
  },
  // 插件项
  plugins: [
    // webpack迁移插件
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new CleanWebpackPlugin(),
    new FriendlyErrors(),
    new VueLoaderPlugin(),
    new CompressionWebpackPlugin({
      test: new RegExp(
        '\\.(js||css)$'
      ),
      threshold: 10240,
      minRatio: 0.8,
      exclude: /\.?dll\./i
    }),
    new ProgressBar({
      complete: Chalk.green('█'),
      incomplete: Chalk.white('█'),
      format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
      clear: false
    }),
    new Extract({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'
    }),
    ...(manifest ? [new webpack.DllReferencePlugin({
      manifest
    })] : []),
  ]
})

entry.forEach((page) => {
  webpackConfig.plugins.push(
    new Html({
      filename: page.page + '.html',
      template: path.join(process.cwd(), page.template || 'script/config/html.ejs'),
      inject: true,
      chunks: [page.page],
      meta: page.meta || {},
      templateParameters: {
        title: page.title || '',
        vendor: config.assetsPath + 'dll.vendor.js',
        globalBarHide: page.globalBarHide || false,
        checkoutLogin: page.checkoutLogin || false,
        prodHide: page.prodHide || false,
        redirect: page.redirect || false,
      }
    })
  )
})

if (config.sassResources && config.sassResources.length) {
  webpackConfig.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: [Extract.loader, 'css-loader', 'postcss-loader', 'sass-loader', {
      loader: 'sass-resources-loader',
      options: {
        resources: [...config.sassResources]
      }
    }]
  })
} else {
  webpackConfig.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: [Extract.loader, 'css-loader', 'postcss-loader', 'sass-loader']
  })
}

const copy = []
if (config.copy && config.copy.length) {
  config.copy.forEach((file) => {
    if (file.indexOf('project.config.mjs') < 0) {
      copy.push({
        from: path.resolve(process.cwd(), file),
        to: file,
      })
    } else {
      copy.push({
        from: path.resolve(process.cwd(), file),
        to: 'project.config.mjs',
      })
    }
  })
}
copy.push({
  from: path.resolve(process.cwd(), 'public'),
  to: '.'
})

webpackConfig.plugins.push(new CopyPlugin({
  patterns: copy
}))

if (config.analyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default webpackConfig
