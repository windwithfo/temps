/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

module.exports = {
  view: 'react',
  lang: 'js',
  ssr: false,
  dll: ['mobx', 'react', 'react-dom', 'mobx-react', 'react-loadable', 'react-router-dom', 'isomorphic-fetch'],
  lint: {
    autoFix: true,
    root: 'src',
    ext: ['.js','.jsx'],
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
