/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
import { resolve } from 'path'

export default {
  view: 'react',
  build: 'vite',
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
  copy: [{
      from: 'project.config.mjs',
      to: 'dist/project.config.mjs'
    }
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'index.html'),
        page1: resolve(process.cwd(), 'page1.html'),
        page2: resolve(process.cwd(), 'page2.html'),
      },
    }
  }
} 
 