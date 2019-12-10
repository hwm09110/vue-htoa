//会议管理
const meetingRoomMage_apply = () =>
  import(
    /* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/Apply.vue'
  );
const meetingRoomMage_applylist = () =>
  import(
    /* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/ApplyList.vue'
  );
const meetingRoomMage_check = () =>
  import(
    /* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/Check.vue'
  );
const meetingRoomMage_detail = () =>
  import(
    /* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/Detail.vue'
  );

//请假管理
const leaveMage_apply = () =>
  import(
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/Apply.vue'
  );
const leaveMage_applylist = () =>
  import(
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/ApplyList.vue'
  );
const leaveMage_check = () =>
  import(
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/Check.vue'
  );
const leaveMage_detail = () =>
  import(
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/Detail.vue'
  );
const leaveMage_allRecord = () =>
  import(
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/AllRecord.vue'
  );

//出差管理
const businesstripMage_apply = () =>
  import(
    /* webpackChunkName: "businesstripMage" */ '../../views/kqxz/businesstripMage/Apply.vue'
  );
const businesstripMage_applylist = () =>
  import(
    /* webpackChunkName: "businesstripMage" */ '../../views/kqxz/businesstripMage/ApplyList.vue'
  );
const businesstripMage_check = () =>
  import(
    /* webpackChunkName: "businesstripMage" */ '../../views/kqxz/businesstripMage/Check.vue'
  );
const businesstripMage_detail = () =>
  import(
    /* webpackChunkName: "businesstripMage" */ '../../views/kqxz/businesstripMage/Detail.vue'
  );
const businesstripMage_allRecord = () =>
  import(
    /* webpackChunkName: "businesstripMage" */ '../../views/kqxz/businesstripMage/AllRecord.vue'
  );

//爱宏途我建议
const feedback_self = () =>
  import(
    /* webpackChunkName: "feedback" */ '../../views/kqxz/feedback/Self.vue'
  );
const feedback_list = () =>
  import(
    /* webpackChunkName: "feedback" */ '../../views/kqxz/feedback/List.vue'
  );
const feedback_suggest = () =>
  import(
    /* webpackChunkName: "feedback" */ '../../views/kqxz/feedback/Suggest.vue'
  );
const feedback_detail = () =>
  import(
    /* webpackChunkName: "feedback" */ '../../views/kqxz/feedback/Detail.vue'
  );

// 加班模块
const overtimeMage_apply = () =>
  import(
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/Apply.vue'
  );
const overtimeMage_myApply = () =>
  import(
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/MyApply.vue'
  );
const overtimeMage_myDetail = () =>
  import(
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/MyDetail.vue'
  );
const overtimeMage_check = () =>
  import(
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/Check.vue'
  );
const overtimeMage_checkDetail = () =>
  import(
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/CheckDetail.vue'
  );
const overtimeMage_applyAllRecode = () =>
  import(
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/ApplyAllRecode.vue'
  );
const overtimeMage_allDetail = () =>
  import(
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/AllDetail.vue'
  );

export default [
  // 会议室管理
  {
    path: 'kqxz/meetingRoomMage/apply',
    name: 'meetingRoomMage_apply',
    meta: {title: '会议室管理-会议室预约'},
    component: meetingRoomMage_apply,
  },
  {
    path: 'kqxz/meetingRoomMage/applylist',
    name: 'meetingRoomMage_applylist',
    meta: {title: '会议室管理-我的申请记录'},
    component: meetingRoomMage_applylist,
  },
  {
    path: 'kqxz/meetingRoomMage/detail',
    name: 'meetingRoomMage_detail',
    meta: {title: '会议室管理-申请详情'},
    component: meetingRoomMage_detail,
  },
  {
    path: 'kqxz/meetingRoomMage/check',
    name: 'meetingRoomMage_check',
    meta: {title: '会议室管理-我的申请记录'},
    component: meetingRoomMage_check,
  },

  // 请假管理
  {
    path: 'kqxz/leaveMage/apply',
    name: 'leaveMage_apply',
    meta: {title: '请假管理-请假申请'},
    component: leaveMage_apply,
  },
  {
    path: 'kqxz/leaveMage/applylist',
    name: 'leaveMage_applylist',
    meta: {title: '请假管理-我的申请记录'},
    component: leaveMage_applylist,
  },
  {
    path: 'kqxz/leaveMage/detail',
    name: 'leaveMage_detail',
    meta: {title: '请假管理-请假详情'},
    component: leaveMage_detail,
  },
  {
    path: 'kqxz/leaveMage/check',
    name: 'leaveMage_check',
    meta: {title: '请假管理-请假审批'},
    component: leaveMage_check,
  },
  {
    path: 'kqxz/leaveMage/allRecord',
    name: 'leaveMage_allRecord',
    meta: {title: '请假管理-公司请假记录'},
    component: leaveMage_allRecord,
  },

  // 出差管理
  {
    path: 'kqxz/businesstripMage/apply',
    name: 'businesstripMage_apply',
    meta: {title: '出差管理-出差申请'},
    component: businesstripMage_apply,
  },
  {
    path: 'kqxz/businesstripMage/applylist',
    name: 'businesstripMage_applylist',
    meta: {title: '出差管理-我的出差记录'},
    component: businesstripMage_applylist,
  },
  {
    path: 'kqxz/businesstripMage/detail',
    name: 'businesstripMage_detail',
    meta: {title: '出差管理-出差详情'},
    component: businesstripMage_detail,
  },
  {
    path: 'kqxz/businesstripMage/check',
    name: 'businesstripMage_check',
    meta: {title: '出差管理-出差审批'},
    component: businesstripMage_check,
  },
  {
    path: 'kqxz/businesstripMage/allRecord',
    name: 'businesstripMage_allRecord',
    meta: {title: '出差管理-公司出差记录'},
    component: businesstripMage_allRecord,
  },

  // 加班申请
  {
    path: 'kqxz/overtimeMage/apply',
    name: 'overtimeMage_apply',
    meta: {title: '加班管理-加班申请'},
    component: overtimeMage_apply,
  },
  {
    path: 'kqxz/overtimeMage/myApply',
    name: 'overtimeMage_myApply',
    meta: {title: '加班管理-申请记录'},
    component: overtimeMage_myApply,
  },
  {
    path: 'kqxz/overtimeMage/myDetail',
    name: 'overtimeMage_myDetail',
    meta: {title: '加班管理-加班详情'},
    component: overtimeMage_myDetail,
  },
  {
    path: 'kqxz/overtimeMage/check',
    name: 'overtimeMage_check',
    meta: {title: '加班管理-加班审批'},
    component: overtimeMage_check,
  },
  {
    path: 'kqxz/overtimeMage/checkDetail',
    name: 'overtimeMage_checkDetail',
    meta: {title: '加班管理-加班详情'},
    component: overtimeMage_checkDetail,
  },
  {
    path: 'kqxz/overtimeMage/applyAllRecode',
    name: 'overtimeMage_applyAllRecode',
    meta: {title: '加班管理-公司加班记录'},
    component: overtimeMage_applyAllRecode,
  },
  {
    path: 'kqxz/overtimeMage/allDetail',
    name: 'overtimeMage_allDetail',
    meta: {title: '加班管理-公司加班记录'},
    component: overtimeMage_allDetail,
  },

  // 爱宏途我建议
  {
    path: 'kqxz/feedback/self',
    name: 'feedback_self',
    meta: {title: '爱宏途我建议-我的建议'},
    component: feedback_self,
  },
  {
    path: 'kqxz/feedback/list',
    name: 'feedback_list',
    meta: {title: '爱宏途我建议-员工建议'},
    component: feedback_list,
  },
  {
    path: 'kqxz/feedback/suggest',
    name: 'feedback_suggest',
    meta: {title: '爱宏途我建议-提建议'},
    component: feedback_suggest,
  },
  {
    path: 'kqxz/feedback/detail',
    name: 'feedback_detail',
    meta: {title: '爱宏途我建议-建议详情'},
    component: feedback_detail,
  },
];
