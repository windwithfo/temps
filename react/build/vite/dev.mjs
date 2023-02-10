/**
 * @file 运行项目命令集合
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path             from 'path'
import { merge, Log }   from './utils.mjs'
import vitePluginImp    from 'vite-plugin-imp'
import react            from '@vitejs/plugin-react'
import eslintPlugin     from '@nabla/vite-plugin-eslint'
import StylelintPlugin  from 'vite-plugin-stylelint-serve'
import config           from './config/project.config.mjs'
import {
  defineConfig,
  createServer
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
    eslintPlugin({
      eslintOptions: {
        fix: true,
        overrideConfigFile: path.resolve('script/config/eslint.js')
      },
      shouldLint: (path) => path.match(/\/src\/[^?]*\.([jt]s|[jt]sx)$/)
    }),
    StylelintPlugin({
      fix: true,
      include: ['src/**/*.css', 'src/**/*.less', 'src/**/*.sass', 'src/**/*.styl', 'src/**/*.scss'],
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
