/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
export default {
  view: 'react',
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
  dll: ['mobx', 'react', 'react-dom', 'mobx-react', 'react-loadable', 'react-router-dom', 'axios'],
  analyzerReport: false,
  copy: ['project.config.mjs'],
  assetsRir: 'dist',
  assetsPath: '/',
  view: [{
    page: 'index',
    template: 'script/config/html.ejs',
    path: 'view/index/index',
    title: 'index',
    meta: {
      keywords: 'index',
      description: 'index',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  },
  {
    page: 'page1',
    template: 'script/config/html.ejs',
    path: 'view/page1/page1',
    title: 'page1',
    meta: {
      keywords: 'page1',
      description: 'page1',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  },
  {
    page: 'page2',
    template: 'script/config/html.ejs',
    path: 'view/page2/page2',
    title: 'page2',
    meta: {
      keywords: 'page2',
      description: 'page2',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  }]
}
 