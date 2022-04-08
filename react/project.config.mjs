/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
import { resolve } from 'path'

export default {
  view: 'react',
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
    publicDir: 'static',
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
          index: resolve(process.cwd(), 'index.html'),
          page1: resolve(process.cwd(), 'page1.html'),
          page2: resolve(process.cwd(), 'page2.html'),
        },
      }
    },
  },
  webpack: {
    dll: ['mobx', 'react', 'react-dom', 'mobx-react', 'react-loadable', 'react-router-dom', 'isomorphic-fetch'],
    view: {
      index: {
        template: 'temp/html.ejs',
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
      page1: {
        template: 'temp/html.ejs',
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
      page2: {
        template: 'temp/html.ejs',
        path: 'view/page2/page2',
        title: 'page2',
        meta: {
          keywords: 'page2',
          description: 'page2',
          viewport: 'initial-scale=1, maximum-scale=1',
          'format-detection': 'telephone=no',
          'format-detection': 'email=no'
        }
      }
    },
    subassetsRir: 'static',
    pub: {
      assetsRir: 'dist',
      assetsPath: '/',
      sourceMap: false,
      devtool: 'source-map',
      gzip: true,
      gzipExtensions: ['js', 'css'],
      analyzerReport: false,
      loaders: [],
      plugins: [],
      copy: ['project.config.mjs'],
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
      plugins: []
    }
  },
}
