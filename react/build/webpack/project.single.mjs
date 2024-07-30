/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
export default {
  view: 'react',
  buildTool: 'webpack',
  single: true,
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
}
 