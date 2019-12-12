import Todo from '../pages/todo/todo.vue'
import Login from '../pages/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'this is login',
      description: '登陆页'
    }
  }
]
