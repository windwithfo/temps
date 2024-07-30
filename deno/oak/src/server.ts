/**
 * @file 服务入口文件
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import { Application, etag }   from 'oak'
import { Log, setEnv, logger } from './utils.ts'
import router                  from './router/index.ts'

const app = new Application()
const arr = [...Deno.args]

setEnv(arr)

app.use(etag.factory())

// Logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get('X-Response-Time')
  logger.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Timing
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${ms}ms`)
})

// Static
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/static`,
      index: 'index.html',
    });
  } catch {
    await next()
  }
})

app.use(router.routes())

const port = Deno.env.get('port') || 3000

Log('start server...')
Log(`server is run on port ${port}`)
app.listen({ port: +port })
