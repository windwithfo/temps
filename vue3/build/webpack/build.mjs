#!/usr/bin/env node
/**
 * @file 发布项目命令集合
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path            from 'path'
import Chalk           from 'chalk'
import dotenv          from 'dotenv'
import webpack         from 'webpack'
import fs              from 'fs-extra'
import { Log, getEnv } from './utils.mjs'
import webpackConfig   from './config/webpack.prod.mjs'
import Compression     from 'compression-webpack-plugin'
import ProgressBar     from 'progress-bar-webpack-plugin'
import proCfg          from './config/project.config.mjs'
import FriendlyErrors  from 'friendly-errors-webpack-plugin'

// get node env args
const env = getEnv('env', 'production')

// create dll when it's missing
if (!fs.pathExistsSync(path.join(process.cwd(), 'public', 'vendor-manifest.json'))) {
  await dll()
}

// buid project
pub()

/**
 * 开始构建
 */
function pub() {
  Log('build project')
  if (env) {
    // 读取env文件
    const result = dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) })
    if (result.error) {
      Log(`read ${result.error.path} faild`, 'blue')
    }
    else {
      const _env = {}
      // 遍历变量
      for (const key in result.parsed) {
        if (Object.hasOwnProperty.call(result.parsed, key)) {
          const element = result.parsed[key]
          _env[`process.env.${key}`] = JSON.stringify(element)
        }
      }
      // 写入webpack
      webpackConfig.plugins.push(new webpack.DefinePlugin(_env))
    }
  }
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      // Handle errors here
      Log(err, 'red')
      Log(stats, 'red')
      Log('build error', 'red')
      return
    }
    Log(stats.toString({
      // Add console colors
      colors: true,
      children: false,
      chunks: false,
      modules: false
    }), 'green')
    // Done processing
    Log('******************************************************************', 'green')
    Log('                       build successfully', 'green')
    Log('******************************************************************', 'green')
  })
}

/**
 * 生成dll文件
 */
function dll() {
  Log('init dll ...')
  const config = {
    mode: 'production',
    entry: {
      vendor: proCfg.dll
    },
    resolve: {
      modules: [
        'node_modules',
        process.cwd() + '/node_modules'
      ],
      extensions: ['.js', '.ts', '.json', '.less', '.css']
    },
    output: {
      path: path.join(process.cwd(), 'public'),
      filename: 'dll.[name].js',
      library: '[name]'
    },
    plugins: [
      new FriendlyErrors(),
      new ProgressBar({
        complete: Chalk.green('█'),
        incomplete: Chalk.white('█'),
        format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
        clear: false
      }),
      new webpack.DllPlugin({
        path: path.join(process.cwd(), 'public', '[name]-manifest.json'),
        name: '[name]'
      }),
      new Compression({
        test: /\.js(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }),
    ]
  }
  return new Promise(function(resolve, reject) {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        Log(err, 'red')
        Log(stats, 'red')
        Log('dll install error', 'red')
        reject()
      }
      // Done processing
      Log(stats.toString({
        // Add console colors
        colors: true,
        children: false,
        chunks: false,
        modules: false
      }), 'green')
      Log('dll installed')
      resolve()
    })
  })
}
