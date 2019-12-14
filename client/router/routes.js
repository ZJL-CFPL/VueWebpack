export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'Todo',
    component: () => import('../pages/todo/todo.vue') // 异步加载路由 写法
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/login.vue'),
    meta: {
      title: 'this is login',
      description: '登陆页'
    }
  }
]
