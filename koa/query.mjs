/**
 * @file 路由配置
 * @author windwithfo(windwithfo@yeah.net)
 */

import User                  from './graphql/user.mjs'
import Game                  from './graphql/game.mjs'
import { loadSchema }        from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

const typeDefs = await loadSchema('./graphql/*.gql', {
  // load from multiple files using glob
  loaders: [
      new GraphQLFileLoader()
  ]
})

const resolvers = {
  Query: {
    ...User.query,
    ...Game.query,
  },
  ...User.resolvers,
  ...Game.resolvers
}

export default {
  typeDefs,
  resolvers
}
