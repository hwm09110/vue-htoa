// 采购管理
const Index = () => import(/* webpackChunkName: "purchase" */ '../../views/purchase/Index.vue')
const Apply = () => import(/* webpackChunkName: "purchase" */ '../../views/purchase/Apply.vue')
const ApplyList = () => import(/* webpackChunkName: "purchase" */ '../../views/purchase/ApplyList.vue')

export default {
  path:'purchase',
  name:'purchase',
  redirect:'/purchase/apply',
  component: Index,
  children:[
    {
      path:'apply',
      name: 'purchase_apply',
      meta: {checkAuth:true, title:"采购申请"},
      component: Apply
    },
    {
      path:'applylist',
      name: 'purchase_applylist',
      meta: {checkAuth:true, title:"采购申请列表"},
      component: ApplyList
    }
  ]
}