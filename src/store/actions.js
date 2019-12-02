import * as types from './mutations-type'

//拉取顶部导航
const getTopNavList = ({commit}) => {
  const topNavList = [
    {
      text:'首页',
      name:'home',
      level_id: 0,
    },
    {
      text:'考勤行政',
      name:'kqxz',
      level_id: 1,
      subNav: [
        {
          text: "会议管理",
          name: "meetingRoomMage",
          level_id: '1_1',
          subNav: [
            {
              text: "会议室预约",
              name: "meetingRoomMage_apply",
              level_id: '1_1_1'
            },
            {
              text: "我的申请记录",
              name: "meetingRoomMage_applylist",
              level_id: '1_1_2'
            },
            {
              text: "会议室审批",
              name: "meetingRoomMage_check",
              level_id: '1_1_3'
            },
          ],
        },
        {
          text: "请假管理",
          name: "leaveMage",
          level_id: '1_2',
          subNav: [
            {
              text: "请假申请",
              name: "leaveMage_appy",
              level_id: '1_2_1'
            },
            {
              text: "我的申请记录",
              name: "leaveMage_appyList",
              level_id: '1_2_2'
            },
            {
              text: "请假审批",
              name: "leaveMage_check",
              level_id: '1_2_3'
            },
            {
              text: "公司请假记录",
              name: "leaveMage_allRecord",
              level_id: '1_2_4'
            },
          ],
        }
      ],
    },
  ]
  setTimeout(()=>{
    commit(types.SET_TOPNAVLIST, topNavList)
  }, 200)
}

//存储登录态
const setLoginStatus = ({commit},status) => {
  console.log('dispatch-setLoginStatus',status)
  commit(types.SET_ISLOGIN, status)
}


export default {
  getTopNavList,
  setLoginStatus
}
