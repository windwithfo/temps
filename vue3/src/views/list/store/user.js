/**
 * @file user模块
 * @author windwithfo(windwithfo@yeah.net)
 */
const userState = {
  namespaced: true,
  state: {
    userInfo: {
      fetch: true,
      userId: '',
      name: '',
      mobile: ''
    }
  },
  getters: {
    authenticated(state) {
      return state.userInfo.userId !== null
    }
  },
  mutations: {
    // 更新用户state数据
    updateUserState(state, payload) {
      const data = Object.assign({}, state.userInfo, payload)
      state.userInfo = data
    }
  },
  actions: {
    // 加载用户信息
    async fetchUserState({ commit }) {
      const result = ''
      if (result.code === 0) {
        commit('updateUserState', Object.assign({}, result.result))
      }
    }
  }
}

export default userState
