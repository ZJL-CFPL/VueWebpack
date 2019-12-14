import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getter/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // true 规范只可在mutations内修改state
    state: defaultState,
    mutations: mutations,
    getters,
    actions
  })
  // 热更替
  if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getter/getters',
      './actions/actions'
    ], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getter/getters').default
      const newActions = require('./actions/actions').default
      // 加载新模块
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
