/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import { Router } from '../../deps.ts'

export const sysRouter = new Router()
  .get('/version', (ctx) => {
    ctx.response.body = `version is: ${'1.0.0'}`
  })
  .get('/env', (ctx) => {
    ctx.response.body = `env is: ${Deno.env.get('mode')}`
  })
