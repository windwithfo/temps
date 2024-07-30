/**
 * @file 运行项目命令集合
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path                from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import config              from '../project.config.mjs'
import StylelintPlugin     from 'vite-plugin-stylelint'
import eslintPlugin        from '@nabla/vite-plugin-eslint'
import {
  merge,
  Log,
  getEnv
} from './utils.mjs'
import {
  defineConfig,
  createServer
} from 'vite'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

// get node env args
const env = getEnv('env', 'development')

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
          return `element-ui/lib/${name}`
        },
      }]
    }),
    eslintPlugin({
      eslintOptions: {
        fix: true,
        overrideConfigFile: path.resolve('script/config/eslint.mjs')
      },
      shouldLint: (path) => path.match(/\/src\/[^?]*\.(vue|m?[jt]sx?)$/)
    }),
    StylelintPlugin({
      fix: true,
      include: ['src/**/*.css', 'src/**/*.less', 'src/**/*.sass', 'src/**/*.styl', 'src/**/*.scss', 'src/**/*.vue'],
      configFile: path.resolve('script/config/style.js')
    }),
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

// 合并配置文件
const buildConfig = merge(viteConfig, config)

const server = await createServer({
  // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
  configFile: false,
  root: process.cwd(),
  ...buildConfig
})
await server.listen()
Log('******************************************************************', 'green')
Log(`server is running on ${buildConfig.server.port} host is ${buildConfig.server.host||'0.0.0.0'}`, 'green')
Log('******************************************************************', 'green')
