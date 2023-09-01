/**
 * @file 运行项目命令集合
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path    from 'path'
import fs      from 'fs-extra'
import { Log } from './utils.mjs'
import config  from '../project.config.mjs'

if (config.copy && config.copy.length) {
  config.copy.forEach((item) => {
    fs.copySync(path.resolve(process.cwd(), item.from), path.resolve(process.cwd(), item.to))
    Log(`copy from ${item.from} to ${item.to}`, 'green')
  })
}

