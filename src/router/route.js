import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Error from '../views/Error'
import PurchaseIndex from '../views/purchase/Index'

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
          meta: {checkAuth:true,title:"首页"},
          component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
        },
        {
          path:'purchase',
          redirect:'/purchase/apply',
          component:PurchaseIndex,
          children:[
            {
              path:'apply',
              name: 'purchase_apply',
              meta: {checkAuth:true,title:"采购申请"},
              component: () => import(/* webpackChunkName: "purchase" */ '../views/purchase/Apply.vue')
            },
            {
              path:'applylist',
              name: 'purchase_applylist',
              meta: {checkAuth:true,title:"采购申请列表"},
              component: () => import(/* webpackChunkName: "purchase" */ '../views/purchase/ApplyList.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {title:"登录"},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中
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
