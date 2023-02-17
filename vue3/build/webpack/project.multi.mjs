/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

export default {
  view: 'vue3',
  buildTool: 'webpack',
  single: false,
  server: {
    port: 8080,
    proxy: {
      // 如果是 /api 打头，则访问地址如下
      '/api': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
  },
  dll: ['vue', 'vuex', 'vue-router', 'axios'],
  analyzerReport: false,
  copy: ['project.config.mjs'],
  assetsRir: 'dist',
  assetsPath: '/',
  view: [{
    page: 'index',
    template: 'script/config/html.ejs',
    show: true,
    path: 'view/index/index',
    title: 'home',
    meta: {
      keywords: 'home',
      description: 'home',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  },
  {
    page: 'list',
    template: 'script/config/html.ejs',
    show: true,
    path: 'view/list/index',
    title: 'list',
    meta: {
      keywords: 'list',
      description: 'list'
    }
  }]
}
 