import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  }, {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue'),
      redirect:'/find',
      children: [
        {
          path: '/mine',
          name: 'mine',
          component: () => import(/* webpackChunkName: "main/index.vue" */ '../views/dashboard/mine/index.vue')
        },
        {
          path: '/find',
          name: 'find',
          component: () => import(/* webpackChunkName: "main/index.vue" */ '../views/dashboard/find/index.vue')
        },
        {
          path: '/village',
          name: 'village',
          component: () => import(/* webpackChunkName: "main/index.vue" */ '../views/dashboard/village/index.vue')
        },
        {
          path: '/video',
          name: 'video',
          component: () => import(/* webpackChunkName: "main/index.vue" */ '../views/dashboard/video/index.vue')
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
