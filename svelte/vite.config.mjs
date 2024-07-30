import { defineConfig }             from 'vite'
import path                         from 'path'
import { VitePWA }                  from 'vite-plugin-pwa'
import { compression }              from 'vite-plugin-compression2'
import eslintPlugin                 from '@nabla/vite-plugin-eslint'
import StylelintPlugin              from 'vite-plugin-stylelint'
import { VitePluginPrefetchModule } from 'vite-plugin-prefetch-module'
import { svelte }                   from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePluginPrefetchModule({ concurrent: 3 }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cacheId: 'hc',
        // mode: 'development',
        globPatterns: ['**\/*.{html,png,jpg,svg,jpeg,webp}'],
        runtimeCaching: [{
          urlPattern: /\.(js|css)/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 1,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          }
        }],
      },
      devOptions: {
        enabled: false,
      },
    }),
    compression({
      threshold: 50 * 1024,
    }),
    eslintPlugin({
      eslintOptions: {
        fix: true,
        overrideConfigFile: path.resolve('script/config/eslint.js'),
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
      configFile: path.resolve('script/config/style.js'),
    }),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    port: 8080,
  },
})
