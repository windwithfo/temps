/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { resolve } from 'path'

export default {
  debug: false,
  devTool: false,
  view: 'vue3',
  build: 'vite',
  lang: 'js',
  ssr: false,
  lint: {
    autoFix: true,
    root: 'src',
    ext: ['.js', '.vue'],
    ignore: ['assets']
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
    base: './',
    publicDir: 'static',
    copy: [
      {
        from: 'project.config.mjs',
        to: 'output/project.config.mjs'
      },
      {
        from: 'renderer.js',
        to: 'output/renderer.js'
      },
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
      outDir: 'output',
      rollupOptions: {
        input: {
          index: resolve(process.cwd(), 'index.html'),
        },
      },
    },
  },
  webpack: {
    dll: ['vue', 'vuex', 'vue-router', 'axios'],
    view: {
      index: {
        template: 'temp/html.ejs',
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
      list: {
        template: 'temp/html.ejs',
        show: true,
        path: 'view/list/index',
        title: 'list',
        meta: {
          keywords: 'list',
          description: 'list'
        }
      }
    },
    subassetsRir: 'static',
    pub: {
      assetsRir: 'dist',
      assetsPath: '/',
      devtool: 'source-map',
      analyzerReport: false,
      gzip: true,
      gzipExtensions: ['js', 'css'],
      loaders: [],
      plugins: [],
      copy: ['project.config.js'],
    },
    dev: {
      assetsPath: '/',
      proxyTable: {},
      host: '0.0.0.0',
      port: 8088,
      autoOpenBrowser: false,
      analyzerReport: false,
      useEslint: true,
      useStylelint: true,
      devtool: 'cheap-module-source-map',
      loaders: [],
      plugins: [],
    },
  },
}
