/**
 * @file 路由配置
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import controller from '../controller/user.mjs'

const query = {
  game: (parent, args) => {
    if (args.id) {
      return [controller.getGame().find((item) => {
        return item.id === args.id
      })]
    }
    return controller.getGame()
  },
}

const resolvers = {
  Game: {

  }
}

export default { query, resolvers }
