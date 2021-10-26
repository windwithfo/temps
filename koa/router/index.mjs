/**
 * @file /user 路由配置
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import Router     from 'koa-router'
import controller from '../controller/index.mjs'

const router = new Router()

router.get('/', async(ctx, next) => {
  let ret
  const data = controller.getData(ctx.query.name)
  try {
    ret = await ctx.render('index.pug', data)
  } catch (error) {
    ret = error
  }
  ctx.body = ret
})

export default router
