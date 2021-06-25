/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
const { resolve } = require('path')

module.exports = {
  view: 'svelte',
  ssr: false,
  lint: {
    autoFix: true,
    root: 'src',
    ext: ['.js', '.vue'],
    ignore: ['assets']
  },
  alias: {
    src: 'src'
  },
  server: {
    port: 8080,
    proxy: {
      // 如果是 /lsbdb 打头，则访问地址如下
      '/lsbdb': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/lsbdb/, '')
      },
    },
  },
  input: {
    index: resolve(__dirname, 'html/index.html')
  },
  build: {
  }
}
