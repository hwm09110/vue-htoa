// 考勤行政-会议管理
const Apply = () => import(/* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/Apply.vue')
const ApplyList = () => import(/* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/ApplyList.vue')

export default [
  {
    path:'meetingRoomMage/apply',
    name: 'meetingRoomMage_apply',
    meta: {title:"会议室预约"},
    component: Apply
  },
  {
    path:'meetingRoomMage/applylist',
    name: 'meetingRoomMage_applylist',
    meta: {title:"我的申请记录"},
    component: ApplyList
  },
  {
    path:'meetingRoomMage/check',
    name: 'meetingRoomMage_check',
    meta: {title:"我的申请记录"},
    component: ApplyList
  }
]