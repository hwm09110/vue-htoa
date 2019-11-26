import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Error from '../views/Error'
import purchase from './purchase'

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect:'/home',
      children:[
        {
          path: 'home',
          name: 'home',
          meta: {checkAuth:true, title:"首页"},
          component: Home
        },
        purchase,
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {title:"登录"},
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      meta: {title:"忘记密码"},
      component: () => import(/* webpackChunkName: "forget" */ '../views/Forget.vue')
    },
    {
      path: '*',
      name: 'error',
      meta: {title:"404"},
      component: Error
    }
  ],
  
  //自定义路由切换时页面如何滚动
  scrollBehavior (to,from,savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 } //页面滚动到顶部
    }
  }
})
