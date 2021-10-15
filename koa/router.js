/**
 * @file test import js
 * @author windwithfo(windwithfo@yeah.net)
 */

const Router = require('koa-router')
const user   = require('./router/user')

const router = new Router()

router.use('/user', user.routes(), user.allowedMethods())

module.exports = router
