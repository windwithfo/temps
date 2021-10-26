/**
 * @file /user 控制器
 * @author windwithfo(windwithfo@yeah.net)
 */

function getData(arg) {
  return {
    userName: arg ? arg : 'Emiya',
    title: 'User'
  }
}

const users = [{
  id: 1,
  name: 'dks1',
  age: 11,
  gameIds: [1]
}, {
  id: 2,
  name: 'dks2',
  age: 22,
  gameIds: [1, 2]
}, {
  id: 3,
  name: 'dks3',
  age: 33,
  gameIds: [3]
}]

const games = [{
  id: 1,
  name: 'ff14',
  mode: 'offline',
},
{
  id: 2,
  name: 'zero',
  mode: 'offline',
},
{
  id: 3,
  name: 'genshen',
  mode: 'online',
}]

export default {
  getData,
  getUser: () => {
    // return users.forEach((item, index) => {
    //   item.games.forEach((gameId, inx) => {
    //     const game = games.find((obj) => {
    //       return obj.id === gameId
    //     })
    //     users[index].games.splice(inx, 1, game)
    //   })
    // })
    return users
  },
  getGame: () => {
    return games
  },
}
