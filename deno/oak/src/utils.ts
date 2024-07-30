/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import chalkin from 'chalkin'
import  Logger from 'logger'

export const logger = new Logger()

await logger.initFileLogger('./log', {
  // cut by day
  rotate: true,
  maxBytes: 10 * 1024,
})

// logger.disableConsole()
// logger.enableConsole()

export function Log(str: string) {
  console.log(chalkin.green(str))
}

export function setEnv(arr: Array<string>) {
  let index = -1
  index = arr.findIndex((arg) => {
    return arg === '--env'
  })
  if (index > -1) {
    Deno.env.set('mode', arr[index + 1])
  } else {
    Deno.env.set('mode', 'production')
  }
  index = arr.findIndex((arg) => {
    return arg === '-p'
  })
  if (index > -1) {
    Deno.env.set('port', arr[index + 1])
  } else {
    Deno.env.set('port', '3000')
  }
}

export function getUrlParam(name: string, source = '') {
  let _source = source
  const reg = new RegExp(`(^|[&,?])${name}=([^&]*)(&|$)`, 'i')

  if (!source) {
    _source = window.location.search.substr(1)
  }
  const r = _source.match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return ''
}
