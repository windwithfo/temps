/**
 * @file 路由配置
 * @author windwithfo(windwithfo@yeah.net)
 */

import Router from 'koa-router'
import user   from './router/user.mjs'
import index  from './router/index.mjs'

const router = new Router()

router.redirect('/', '/graphql')
router.use('/user', user.routes(), user.allowedMethods())
router.use('/index', index.routes(), index.allowedMethods())

export default router
