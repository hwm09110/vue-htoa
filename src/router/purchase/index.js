// 采购管理
const Apply = () => import(/* webpackChunkName: "purchase" */ '../../views/purchase/Apply.vue')
const ApplyList = () => import(/* webpackChunkName: "purchase" */ '../../views/purchase/ApplyList.vue')

export default [
  {
    path:'purchase/apply',
    name: 'purchase_apply',
    meta: {title:"采购申请"},
    component: Apply
  },
  {
    path:'purchase/applylist',
    name: 'purchase_applylist',
    meta: {title:"采购申请列表"},
    component: ApplyList
  }
]