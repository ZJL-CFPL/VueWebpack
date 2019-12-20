import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    // base: '/dist', // webpack publicpath 默认路径
    routes,
    mode: 'history',
    scrollBehavior (to, from, savePosition) { // 记录上一页停留位置
      if (savePosition) {
        return savePosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
  })
}
