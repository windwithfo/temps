

import Chalk    from 'chalk'
import { argv } from 'node:process'

/**
 * log封装
 *
 * @param {string} msg 打印信息
 * @param {string} to 输出颜色 默认为蓝色
 */
export function Log(msg, color = 'blue') {
  console.log(Chalk[color](msg))
}

/**
 * nodejs参数解析
 * 
 * @param {string} arg 参数值
 * @param {string} env 默认值
 */
export function getEnv(arg, env) {
  let _env = env || 'Nil'
  argv.forEach((item, index) => {
    switch (arg) {
      case 'env':
        if (item === '-e') {
          _env = argv[index + 1]
        }
        if (item.indexOf('--env=') === 0) {
          _env = item.split('=')[1]
        }
        break
      default:
        if (item.indexOf(`--${arg}=`) === 0) {
          _env = item.split('=')[1]
        }
    }
  })
  return _env
}


/**
 * 合并对象
 *
 * @param {object} source 源对象
 * @param {object} obj 待合并对象
 * @returns {object} 合并后的新对象
 */
export function merge(source, obj) {
  const ret = {}

  Object.keys(source)
    .concat(Object.keys(obj))
    .forEach((key) => {
      let value
      if (source[key] && obj[key]) {
        if (Object.prototype.toString.call(source[key]) === '[object Object]') {
          value = merge(source[key], obj[key])
        } else if (Object.prototype.toString.call(source[key]) === '[object Array]') {
          value = source[key].concat(obj[key])
        } else {
          value = obj[key]
        }
      } else {
        value = source[key] ? source[key] : obj[key]
      }
      ret[key] = value
    })

  return ret
}
