import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import(/* webpackChunkName: "forget" */ '../views/Forget.vue')
    },
    {
      path: '*',
      name: 'error',
      component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
    }
  ]
})
