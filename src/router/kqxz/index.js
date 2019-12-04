// 考勤行政-会议管理
const meetingRoomMage_apply = () =>
  import (
    /* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/Apply.vue'
  );
const meetingRoomMage_applylist = () =>
  import (
    /* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/ApplyList.vue'
  );
const meetingRoomMage_check = () =>
  import (
    /* webpackChunkName: "meetingRoomMage" */ '../../views/kqxz/meetingRoomMage/Check.vue'
  );

// 考勤行政-请假管理
const leaveMage_apply = () =>
  import (
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/Apply.vue'
  );
const leaveMage_applylist = () =>
  import (
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/ApplyList.vue'
  );
const leaveMage_check = () =>
  import (
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/Check.vue'
  );
const leaveMage_allRecord = () =>
  import (
    /* webpackChunkName: "leaveMage" */ '../../views/kqxz/leaveMage/AllRecord.vue'
  );

// 加班模块
const overtimeMage_apply = () =>
  import (
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/Apply.vue'
  );
const overtimeMage_myApply = () =>
  import (
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/MyApply.vue'
  );
const overtimeMage_check = () =>
  import (
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/Check.vue'
  );
const overtimeMage_applyAllRecode = () =>
  import (
    /* webpackChunkName: "overtimeMage" */ '../../views/kqxz/overtimeMage/ApplyAllRecode.vue'
  );

export default [
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
    path: 'kqxz/meetingRoomMage/check',
    name: 'meetingRoomMage_check',
    meta: {title: '会议室管理-我的申请记录'},
    component: meetingRoomMage_check,
  },

  {
    path: 'kqxz/leaveMage/apply',
    name: 'leaveMage_apply',
    meta: {title: '请假管理管理-请假申请'},
    component: leaveMage_apply,
  },
  {
    path: 'kqxz/leaveMage/applylist',
    name: 'leaveMage_applylist',
    meta: {title: '请假管理管理-我的申请记录'},
    component: leaveMage_applylist,
  },
  {
    path: 'kqxz/leaveMage/check',
    name: 'leaveMage_check',
    meta: {title: '请假管理管理-请假审批'},
    component: leaveMage_check,
  },
  {
    path: 'kqxz/leaveMage/check',
    name: 'leaveMage_check',
    meta: {title: '请假管理管理-请假审批'},
    component: leaveMage_check,
  },
  {
    path: 'kqxz/leaveMage/allRecord',
    name: 'leaveMage_allRecord',
    meta: {title: '请假管理管理-公司请假记录'},
    component: leaveMage_allRecord,
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
    path: 'kqxz/overtimeMage/check',
    name: 'overtimeMage_check',
    meta: {title: '加班管理-加班审批'},
    component: overtimeMage_check,
  },
  {
    path: 'kqxz/overtimeMage/applyAllRecode',
    name: 'overtimeMage_applyAllRecode',
    meta: {title: '加班管理-公司加班记录'},
    component: overtimeMage_applyAllRecode,
  },
];
