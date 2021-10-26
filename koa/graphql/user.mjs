/**
 * @file 路由配置
 * @author windwithfo(windwithfo@yeah.net)
 */

import controller from '../controller/user.mjs'

const query = {
  user: (parent, args) => {
    const users = controller.getUser()
    if (args.id) {
      return [users.find((item) => {
        return item.id === args.id
      })]
    }
    return users
  },
}

const resolvers = {
  User: {
    games: (parent) => {
      const games = controller.getGame()
      const ids = parent.gameIds
      const ret = []
      ids.map((id) => {
        const data = games.find((item) => {
          return item.id === id
        })
        ret.push(data)
      })
      return ret
    },
  }
}

export default { query, resolvers }
