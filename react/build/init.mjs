/**
 * 根据不同条件初始化项目
 * 
 * @example node build/init.mjs --build=vite --single=true
 */
import fs              from 'fs-extra'
import { getEnv, Log } from './utils.mjs'

// 获取项目配置
const config = {
  single: getEnv('single'),
  build: getEnv('build'),
}
Log('start build')
// 拷贝通用文件
fs.copy('build/eslint.js', 'script/config/eslint.js')
fs.copy('build/style.js', 'script/config/style.js')
fs.copy('build/utils.mjs', 'script/utils.mjs')

// 拷贝webpack配置文件
if (config.build === 'webpack') {
  // 拷贝package.json
  fs.copy('build/webpack/package.json', 'package.json')
  // 拷贝webpack配置
  fs.copy('build/webpack/webpack.base.mjs', 'script/config/webpack.base.mjs')
  fs.copy('build/webpack/webpack.dev.mjs', 'script/config/webpack.dev.mjs')
  fs.copy('build/webpack/webpack.prod.mjs', 'script/config/webpack.prod.mjs')
  fs.copy('build/webpack/html.ejs', 'script/config/html.ejs')
  fs.copy('build/webpack/dev.mjs', 'script/dev.mjs')
  fs.copy('build/webpack/build.mjs', 'script/build.mjs')
  fs.copy('build/webpack/babel.config.js', 'babel.config.js')
  // 拷贝单页文件
  if (config.single === 'true') {
    fs.copy('build/webpack/project.single.mjs', 'script/config/project.config.mjs')
    fs.copy('build/views/index.tsx', 'src/views/index.tsx')
    fs.copy('build/views/store.ts', 'src/views/store.ts')
  } else {
    // 拷贝多页文件
    fs.copy('build/webpack/project.multi.mjs', 'script/config/project.config.mjs')
    fs.copy('build/views/index', 'src/views/index')
    fs.copy('build/views/page1', 'src/views/page1')
    fs.copy('build/views/page2', 'src/views/page2')
  }
} else {
  // 拷贝package.json
  fs.copy('build/vite/package.json', 'package.json')
  // 拷贝vite配置文件
  fs.copy('build/vite/dev.mjs', 'script/dev.mjs')
  fs.copy('build/vite/build.mjs', 'script/build.mjs')
  
  // 拷贝单页文件
  if (config.single === 'true') {
    fs.copy('build/vite/project.single.mjs', 'script/config/project.config.mjs')
    fs.copy('build/views/index.tsx', 'src/views/index.tsx')
    fs.copy('build/views/store.ts', 'src/views/store.ts')
    fs.copy('build/vite/index.single.html', 'index.html')
  } else {
    // 拷贝多页文件
    fs.copy('build/vite/project.multi.mjs', 'script/config/project.config.mjs')
    fs.copy('build/views/index', 'src/views/index')
    fs.copy('build/views/page1', 'src/views/page1')
    fs.copy('build/views/page2', 'src/views/page2')
    fs.copy('build/vite/index.multi.html', 'index.html')
    fs.copy('build/vite/page1.html', 'page1.html')
    fs.copy('build/vite/page2.html', 'page2.html')
  }
}

Log('end build')
