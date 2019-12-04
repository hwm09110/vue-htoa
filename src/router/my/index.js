// 我的

const TodoList = () => import(/* webpackChunkName: "my" */ '../../views/my/TodoList.vue')
const ApplyList = () => import(/* webpackChunkName: "my" */ '../../views/my/ApplyList.vue')
const NoticeList = () => import(/* webpackChunkName: "my" */ '../../views/my/NoticeList.vue')
const MailList = () => import(/* webpackChunkName: "my" */ '../../views/my/MailList.vue')
const Info = () => import(/* webpackChunkName: "my" */ '../../views/my/Info.vue')

export default [
  {
    path:'my/todoList',
    name: 'my_todoList',
    meta: {title:"我的待办"},
    component: TodoList
  },
  {
    path:'my/applylist',
    name: 'my_applylist',
    meta: {title:"我的申请"},
    component: ApplyList
  },
  {
    path:'my/noticeList',
    name: 'my_noticeList',
    meta: {title:"通知中心"},
    component: NoticeList
  },
  {
    path:'my/mailList',
    name: 'my_mailList',
    meta: {title:"通讯录"},
    component: MailList
  },
  {
    path:'my/info',
    name: 'my_info',
    meta: {title:"个人中心"},
    component: Info
  },
]