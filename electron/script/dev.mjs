/**
 * @file 运行项目命令集合
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path            from 'path'
import { merge, Log }  from './utils.mjs'
import vue             from '@vitejs/plugin-vue'
import config          from '../project.config.mjs'
import StylelintPlugin from 'vite-plugin-stylelint'
import AutoImport      from 'unplugin-auto-import/vite'
import eslintPlugin    from '@nabla/vite-plugin-eslint'
import Components      from 'unplugin-vue-components/vite'
import {
  defineConfig,
  createServer
} from 'vite'
import {
  ElementPlusResolver,
  VantResolver
} from 'unplugin-vue-components/resolvers'

const viteConfig = defineConfig({
  base: '/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
    eslintPlugin({
      eslintOptions: {
        fix: true,
        overrideConfigFile: path.resolve('script/config/eslint.mjs')
      },
      shouldLint: (path) => path.match(/\/pages\/[^?]*\.(vue|m?[jt]sx?)$/)
    }),
    StylelintPlugin({
      fix: true,
      include: ['style/**/*.css', 'style/**/*.less', 'style/**/*.sass', 'style/**/*.styl', 'style/**/*.scss', 'pages/**/*.vue'],
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
  }
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
