/**
 * @file 运行项目命令集合
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path                from 'path'
import fs                  from 'fs-extra'
import { createVuePlugin } from 'vite-plugin-vue2'
import config              from '../project.config.mjs'
import viteCompression     from 'vite-plugin-compression'
import {
  merge,
  Log,
  getEnv
} from './utils.mjs'
import {
  defineConfig,
  build
} from 'vite'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

// get node env args
const env = getEnv('env', 'production')

const viteConfig = defineConfig({
  mode: env,
  plugins: [
    createVuePlugin(),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [{
        libraryName: 'element-ui',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3)
          return `element-ui/packages/theme-chalk/src/${name}.scss`
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`
        },
      }]
    }),
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
    Log(`copy from ${item.from} to ${item.to}`, 'green')
  })
}

Log('******************************************************************', 'green')
Log('                       build successfully', 'green')
Log('******************************************************************', 'green')
