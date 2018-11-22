import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Error from '../views/Error'
import PurchaseIndex from '../views/purchase/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
              component: () => import(/* webpackChunkName: "purchase_apply" */ '../views/purchase/Apply.vue')
            },
            {
              path:'applylist',
              name: 'purchase_applylist',
              component: () => import('../views/purchase/ApplyList.vue')
            }
          ]
        }
      ]
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
      component: Error
    }
  ]
})
