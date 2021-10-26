/**
 * @file /user 路由配置
 * @author windwithfo(windwithfo@yeah.net)
 */

import Router     from 'koa-router'
import controller from '../controller/user.mjs'

const router = new Router()

router.get('/version', (ctx, next) => {
  ctx.body = { vsersion: '1.0.0' }
})

router.get('/page', async(ctx, next) => {
  let ret
  const data = controller.getData(ctx.query.name)
  try {
    ret = await ctx.render('user.pug', data)
  } catch (error) {
    ret = error
  }
  ctx.body = ret
})

export default router
