/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
import { resolve } from 'path'

export default {
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
        from: 'project.config.mjs',
        to: 'dist/project.config.mjs'
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
          index: resolve(process.cwd(), 'html/index.html'),
        },
      }
    },
  }
}
