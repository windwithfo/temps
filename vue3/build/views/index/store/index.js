
/**
 * @file store入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */
import { createStore } from 'vuex'
import user from './user'

/** 创建store */
const store = createStore({
  strict: true,
  state: {
    env: ''
  },
  mutations: {
    setEnv: (state, payload) => {
      Object.assign(state, payload)
    }
  },
  // 子模块
  modules: {
    user
  }
})

export default store
