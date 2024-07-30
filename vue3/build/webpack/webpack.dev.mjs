/**
 * @file 开发配置
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
import ESLintPlugin             from 'eslint-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import config                   from '../../project.config.mjs'
import Linter                   from 'stylelint-webpack-plugin'
import ProgressBar              from 'progress-bar-webpack-plugin'
import AutoImport               from 'unplugin-auto-import/webpack'
import FriendlyErrors           from 'friendly-errors-webpack-plugin'
import Components               from 'unplugin-vue-components/webpack'
import {
  ElementPlusResolver,
  VantResolver
}  from 'unplugin-vue-components/resolvers'

let manifest
try {  
   manifest = fs.readJSONSync(process.cwd() + `/public/vendor-manifest.dev.json`)
} catch (_) {
  console.log('no dll json')
}

const entry = config.views || [{ page: 'index', path: 'view/index' }]

const webpackConfig = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.join(process.cwd(), config.assetsRir),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: config.assetsPath
  },
  resolve: {
    alias: {
      '@': process.cwd() + '/src',
      component: process.cwd() + '/src/components',
      asset: process.cwd() + '/src/assets',
      view: process.cwd() + '/src/views',
      vue$: 'vue/dist/vue.runtime.esm-browser.js'
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        resolve: {
          fullySpecified: false
        },
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
    ]
  },
  devtool: 'eval-cheap-source-map',
  performance: {
    hints: false
  },
  stats: 'none',
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.assetsPath, 'index.html') },
      ]
    },
    static: ['public', 'static'],
    client: {
      logging: 'none',
      overlay: false,
      progress: false,
      webSocketURL: {
        hostname: "0.0.0.0",
        pathname: "/ws",
        port: config.server.port,
      },
    },
    allowedHosts: 'all',
    devMiddleware: {
      publicPath: config.assetsPath
    },
    hot: true,
    compress: true,
    host: config.server.host,
    port: config.server.port,
    open: false,
    proxy: config.server.proxy,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      devServer.app.get('/env', function (_, res) {
        res.json({ env: 'dev' })
      })

      return middlewares
    }
  },
  // 插件项
  plugins: [
    // webpack迁移插件
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      DEV: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
      __VUE_PROD_API__: JSON.stringify(true),
    }),
    new ProgressBar({
      complete: Chalk.green('█'),
      incomplete: Chalk.white('█'),
      format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
      clear: false
    }),
    new Linter({
      configFile: path.resolve('script/config/style.js'),
      files: ['src/**/*.scss', 'src/**/*.vue'],
      ignorePath: 'node_modules/**',
      fix: true
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts', 'vue'],
      files: [path.resolve(process.cwd(), 'src')],
      fix: true,
      configType: 'flat',
      overrideConfigFile: path.resolve('script/config/eslint.mjs'),
    }),
    ...(manifest ? [new webpack.DllReferencePlugin({
      manifest
    })] : []),
    AutoImport({
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
  ]
})

if (config.sassResources && config.sassResources.length) {
  webpackConfig.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader', {
      loader: 'sass-resources-loader',
      options: {
        resources: [...config.sassResources]
      }
    }]
  })
} else {
  webpackConfig.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
  })
}

if (config.copy && config.copy.length) {
  const copy = []
  config.copy.forEach((file) => {
    if (file.indexOf('project.config.mjs') < 0) {
      copy.push({
        from: path.resolve(process.cwd(), file),
        to: file,
      })
    }
  })
  if (copy.length) {  
    webpackConfig.plugins.push(new CopyPlugin({
      patterns: copy
    }))
  }
}

if (config.analyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

entry.forEach((page) => {
  webpackConfig.plugins.push(
    new Html({
      filename: page.page + '.html',
      template: path.join(process.cwd(), page.template || 'script/config/html.ejs'),
      inject: true,
      // excludeChunks: Object.keys(entry).filter(function (item) {
      //   return (item !== page)
      // }),
      chunks: [page.page],
      meta: page.meta || {},
      templateParameters: {
        title: page.title || '',
        vendor: config.assetsPath + 'dll.vendor.dev.js',
        globalBarHide: page.globalBarHide || false,
        checkoutLogin: page.checkoutLogin || false,
        prodHide: page.prodHide || false,
        redirect: page.redirect || false,
      },
    })
  )
})

export default webpackConfig
