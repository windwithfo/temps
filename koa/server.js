/**
 * @file test import js
 * @author windwithfo(windwithfo@yeah.net)
 */

const Koa         = require('koa')
const { resolve } = require('path')
const chalk       = require('chalk')
const body        = require('koa-body')
const json        = require('koa-json')
const router      = require('./router')
const views       = require('koa-views')
const static      = require('koa-static')

const app = new Koa()
const render = views(resolve('./view'), { autoRender: false, extension: 'pug' })

app.use(static('assets'))
app.use(body())
app.use(render)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(json())

const port = 3000

app.listen(port, ()=> {
  console.log(
    chalk.cyan(`
*****************************************
*                                       *
*     server is run on port ${port}        *
*                                       *
*****************************************
    `)
  )
})
