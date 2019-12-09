// 采购管理
const First = () => import(/* webpackChunkName: "purchase" */ '../../views/unitTeam/department/First.vue')
const Second = () => import(/* webpackChunkName: "purchase" */ '../../views/unitTeam/department/Second.vue')
const Third = () => import(/* webpackChunkName: "purchase" */ '../../views/unitTeam/department/Third.vue')

const Onjob = () => import(/* webpackChunkName: "purchase" */ '../../views/unitTeam/employee/Onjob.vue')
const Form = () => import(/* webpackChunkName: "purchase" */ '../../views/unitTeam/employee/Form.vue')


export default [
  {
    path:'unitTeam/departmentMage/first',
    name: 'departmentMage_first',
    meta: {title:"部门管理-一级部门"},
    component: First
  },
  {
    path:'unitTeam/departmentMage/second',
    name: 'departmentMage_second',
    meta: {title:"部门管理-二级部门"},
    component: Second
  },
  {
    path:'unitTeam/departmentMage/third',
    name: 'departmentMage_third',
    meta: {title:"部门管理-三级部门"},
    component: Third
  },   

  {
    path:'unitTeam/employeeMage/onjob',
    name: 'employeeMage_onjob',
    meta: {title:"员工管理-在职员工"},
    component: Onjob
  },
  {
    path:'unitTeam/employeeMage/form',
    name: 'employeeMage_form',
    meta: {title:"员工管理-在职员工"},
    component: Form
  }  
]