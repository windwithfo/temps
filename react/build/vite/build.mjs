/**
 * @file 运行项目命令集合
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path             from 'path'
import fs               from 'fs-extra'
import { merge, Log }   from './utils.mjs'
import vitePluginImp    from 'vite-plugin-imp'
import react            from '@vitejs/plugin-react'
import config           from '../project.config.mjs'
import viteCompression  from 'vite-plugin-compression'
import {
  defineConfig,
  build
} from 'vite'

const viteConfig = defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy']
        }
      }
    }),
    vitePluginImp({
      onlyBuild: false,
      optimize: true,
      libList: [{
        libName: 'antd',
        libDirectory: 'es',
        style: (name) => `antd/es/${name}/style/index`
      }]
    }),
    {
      postcssPlugin: 'internal:charset-removal',
      AtRule: {
        charset: (atRule) => {
          if (atRule.name === 'charset') {
            atRule.remove();
          }
        }
      }
    },
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      'component': path.resolve(process.cwd(), 'src/components'),
      'asset': path.resolve(process.cwd(), 'src/assets'),
      'view': path.resolve(process.cwd(), 'src/views'),
      'api': path.resolve(process.cwd(), 'src/api'),
      'common': path.resolve(process.cwd(), 'src/common'),
    },
  },
})

const buildConfig = merge(viteConfig, config)

await build({
  // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
  configFile: false,
  root: process.cwd(),
  ...buildConfig
})

if (config.copy && config.copy.length) {
  config.copy.forEach((item) => {
    fs.copySync(path.resolve(process.cwd(), item.from), path.resolve(process.cwd(), item.to))
    Log(`copy from${item.from} to ${item.to}`, 'green')
  })
}

Log('******************************************************************', 'green')
Log('                       build successfully', 'green')
Log('******************************************************************', 'green')
