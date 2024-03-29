import Vue from 'vue'
import VueRouter from 'vue-router'
// import dashboard from './components/dashboard.js'
import Sheetdetails from '../views/details/sheetDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      redirect: "/login"
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  }, {
      path: '/home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue'),
      redirect:'/find',
      children: [
          {
              path: '/mine',
              name: 'mine',
              component: () => import(/* webpackChunkName: "mine" */ '../views/dashboard/mine/index.vue')
          }, {
              path: '/find',
              name: 'find',
              component: () => import(/* webpackChunkName: "find" */ '../views/dashboard/find/index.vue')
          }, {
              path: '/village',
              name: 'village',
              component: () => import(/* webpackChunkName: "village" */ '../views/dashboard/village/index.vue')
          }, {
              path: '/video',
              name: 'video',
              component: () => import(/* webpackChunkName: "mine" */ '../views/dashboard/video/index.vue')
          }
      ]
  }, {
    name: 'sheetdetails',
    path: `/sheetdetails:id`,
    component: Sheetdetails
  }, {
    name: 'search',
    path: `/search`,
    component: () => import(/* webpackChunkName: "search" */ '../views/search/index.vue'),
  }, {
    name: 'searchDetail',
    path: '/searchDetail/:key',
    component: () => import(/* webpackChunkName: "searchDetail" */ '../views/search/detail.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
    console.log(targetPath)
});

export default router
