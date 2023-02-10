/**
 * @file 服务入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */
import os               from 'os'
import Koa              from 'koa'
import http             from 'http'
import { resolve }      from 'path'
import chalk            from 'chalk'
import body             from 'koa-body'
import json             from 'koa-json'
import views            from 'koa-views'
import fileStatic       from 'koa-static'
import query            from './query.mjs'
import router           from './router.mjs'
import { ApolloServer } from 'apollo-server-koa'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginInlineTrace
} from 'apollo-server-core'

const app = new Koa()
const render = views(resolve('./view'), { autoRender: false, extension: 'pug' })

app.use(fileStatic('assets'))
app.use(body())
app.use(render)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(json())

const port = process.env.port || 3000

async function startServer(typeDefs, resolvers) {
  const httpServer = http.createServer()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginInlineTrace(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  })
  
  await server.start()
  server.applyMiddleware({ app })
  httpServer.on('request', app.callback())
  await new Promise(resolve => httpServer.listen({ port, hostname: '0.0.0.0' }, resolve))

  console.log(
    chalk.cyan(`
  *************************************************
                                                
      server is run ${getIPAdress()} on port ${port}
      graphqlPath is ${server.graphqlPath}
                                                
  *************************************************
    `)
  )
}

/**
 * 获取本机ip
 */
function getIPAdress() {
  const interfaces = os.networkInterfaces()
  for (let devName in interfaces) {
      const iface = interfaces[devName]
      for (let i = 0; i < iface.length; i++) {
          const alias = iface[i]
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address
          }
      }
  }
}

// start with apollo grahql server
startServer(query.typeDefs, query.resolvers)

// start with koa
// app.listen(port, ()=> {
//   console.log(
//     chalk.cyan(`
//   *************************************************
//   *                                               *
//   *     server is run ${getIPAdress()} on port ${port}    *
//   *                                               *
//   *************************************************
//     `)
//   )
// })
