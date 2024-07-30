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
    proxy: [{
      // 如果是 /api 打头，则访问地址如下
      context: ['/api'],
      target: 'https://www.baidu.com',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    }]
  },
  dll: ['mobx', 'react', 'react-dom', 'mobx-react', 'react-loadable', 'react-router-dom', 'axios'],
  analyzerReport: false,
  copy: ['project.config.mjs'],
  assetsRir: 'dist',
  assetsPath: '/',
  views: [{
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
    page: 'list',
    template: 'script/config/html.ejs',
    path: 'view/list/index',
    title: 'list',
    meta: {
      keywords: 'list',
      description: 'list',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  }]
}
