/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
const { resolve } = require('path')

module.exports = {
  view: 'svelte',
  build: 'vite',
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
      // 如果是 /api 打头，则访问地址如下
      '/api': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
  },
  vite: {
    copy: [
      {
        from: 'project.config.js',
        to: 'dist/project.config.js'
      }
    ],
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
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'html/index.html'),
        },
      }
    },
  }
}
