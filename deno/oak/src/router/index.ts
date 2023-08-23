/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import { userRouter }             from './user.ts'
import { sysRouter }              from './system.ts'
import { Router, ReactDOMServer } from '../../deps.ts'
import { App }                    from '../page/index.tsx'

const router = new Router()
  .get('/view/(.*)', (ctx) => {
    const uri = ctx.request.url.pathname + ctx.request.url.search
    try {
      const body = ReactDOMServer.renderToString(App(uri))
      ctx.response.body = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Deno Test</title>
    </head>
    <body >
      <div id="root">${body}</div>
    </body>
    </html>`
    } catch (error) {
      console.error(error);
    }
  })
  .use('/sys', sysRouter.routes(), sysRouter.allowedMethods())
  .use('/user', userRouter.routes(), userRouter.allowedMethods())

export default router
