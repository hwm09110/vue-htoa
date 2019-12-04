export const topNavList = [
  {
    text:'首页',
    name:'home',
    level_id: 0,
    subNav: [
      {
        text: "我的",
        name: "my",
        level_id: '0_1',
        subNav: [
          {
            text: "我的待办",
            name: "my_todoList",
            level_id: '0_1_1'
          },
          {
            text: "我的申请",
            name: "my_applylist",
            level_id: '0_1_2'
          },
          {
            text: "通知中心",
            name: "my_noticeList",
            level_id: '0_1_3'
          },
          {
            text: "通讯录",
            name: "my_mailList",
            level_id: '0_1_4'
          },
        ],
      },
    ]
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
            name: "leaveMage_apply",
            level_id: '1_2_1'
          },
          {
            text: "我的申请记录",
            name: "leaveMage_applylist",
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
      },
    ],
  },
]