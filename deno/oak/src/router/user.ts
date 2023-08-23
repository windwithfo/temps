/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import { Router } from '../../deps.ts'
import { login }  from '../controller/user.ts'

export const userRouter = new Router()
  .get('/login', async (ctx) => {
    const user = await login('admin', 'admin')
    ctx.response.body = {
      code: 0,
      data: user
    }
  })
  .get('/detail/:userId', (ctx) => {
    ctx.response.body = `detail userId is: ${ctx.params.userId}`
  })
