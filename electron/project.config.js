/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

module.exports = {
  debug: false,
  devTool: false,
  view: 'vue',
  lang: 'js',
  ssr: false,
  dll: ['vue', 'vuex', 'vue-router', 'isomorphic-fetch'],
  lint: {
    autoFix: true,
    root: 'src',
    ext: ['.js','.vue'],
    ignore: ['assets']
  },
  alias: {
    src: 'src'
  },
  pub: {
    assetsRir: 'dist',
    assetsPath: '',
    sourceMap: false,
    devtool: '#source-map',
    gzip: true,
    gzipExtensions: ['js', 'css'],
    analyzerReport: false,
    loaders: [],
    plugins: []
  },
  dev: {
    subassetsRir: 'static',
    assetsPath: '/',
    proxyTable: {},
    host: '0.0.0.0',
    port: 8088,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    useStylelint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
    loaders: [],
    plugins: []
  }
}
