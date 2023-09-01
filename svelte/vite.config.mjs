import { defineConfig } from 'vite'
import path             from 'path'
import { VitePWA }      from 'vite-plugin-pwa'
import eslintPlugin     from '@nabla/vite-plugin-eslint'
import StylelintPlugin  from 'vite-plugin-stylelint-serve'
import { svelte }       from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      devOptions: {
        enabled: false
      },
    }),
    eslintPlugin({
      eslintOptions: {
        fix: true,
        overrideConfigFile: path.resolve('script/config/eslint.js')
      },
      shouldLint: (path) => {
        const ret = path.match(/\/src\/[^?]*\.(svelte|m?[jt]sx?)$/)
        if (!ret) {
          return false
        }
        return true
      }
    }),
    StylelintPlugin({
      fix: true,
      include: ['src/**/*.css', 'src/**/*.less', 'src/**/*.sass', 'src/**/*.styl', 'src/**/*.scss', 'src/**/*.svelte'],
      configFile: path.resolve('script/config/style.js')
    }),
  ],
  server: {
    port: 8080
  }
})
