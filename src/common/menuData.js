export const topNavList = [
  {
    text: '首页',
    name: 'home',
    level_id: 0,
    subNav: [
      {
        text: '我的',
        name: 'my',
        level_id: '0_1',
        subNav: [
          {
            text: '我的待办',
            name: 'my_todoList',
            level_id: '0_1_1',
          },
          {
            text: '我的申请',
            name: 'my_applylist',
            level_id: '0_1_2',
          },
          {
            text: '通知中心',
            name: 'my_noticeList',
            level_id: '0_1_3',
          },
          {
            text: '通讯录',
            name: 'my_txlList',
            level_id: '0_1_4',
          },
        ],
      },
    ],
  },
  {
    text: '考勤行政',
    name: 'kqxz',
    level_id: 1,
    subNav: [
      {
        text: '会议管理',
        name: 'meetingRoomMage',
        level_id: '1_1',
        subNav: [
          {
            text: '会议室预约',
            name: 'meetingRoomMage_apply',
            level_id: '1_1_1',
          },
          {
            text: '我的申请记录',
            name: 'meetingRoomMage_applylist',
            level_id: '1_1_2',
          },
          {
            text: '会议室审批',
            name: 'meetingRoomMage_check',
            level_id: '1_1_3',
          },
        ],
      },
      {
        text: '请假管理',
        name: 'leaveMage',
        level_id: '1_2',
        subNav: [
          {
            text: '请假申请',
            name: 'leaveMage_apply',
            level_id: '1_2_1',
          },
          {
            text: '我的申请记录',
            name: 'leaveMage_applylist',
            level_id: '1_2_2',
          },
          {
            text: '请假审批',
            name: 'leaveMage_check',
            level_id: '1_2_3',
          },
          {
            text: '公司请假记录',
            name: 'leaveMage_allRecord',
            level_id: '1_2_4',
          },
        ],
      },
      {
        text: '出差管理',
        name: 'businesstripMage',
        level_id: '1_3',
        subNav: [
          {
            text: '出差申请',
            name: 'businesstripMage_apply',
            level_id: '1_3_1',
          },
          {
            text: '我的出差记录',
            name: 'businesstripMage_applylist',
            level_id: '1_3_2',
          },
          {
            text: '出差审批',
            name: 'businesstripMage_check',
            level_id: '1_3_3',
          },
          {
            text: '公司出差记录',
            name: 'businesstripMage_allRecord',
            level_id: '1_3_4',
          },
        ],
      },
      {
        text: '加班管理',
        name: 'overtimeMage',
        level_id: '1_2',
        subNav: [
          {
            text: '加班申请',
            name: 'overtimeMage_apply',
            level_id: '1_2_1',
          },
          {
            text: '我的申请记录',
            name: 'overtimeMage_myApply',
            level_id: '1_2_2',
          },
          {
            text: '加班审批',
            name: 'overtimeMage_check',
            level_id: '1_2_3',
          },
          {
            text: '公司加班记录',
            name: 'overtimeMage_applyAllRecode',
            level_id: '1_2_4',
          },
        ],
      },
      {
        text: '爱宏途我建议',
        name: 'feedback',
        level_id: '1_5',
        subNav: [
          {
            text: '我的建议',
            // name: 'my_info',
            name: 'feedback_self',
            level_id: '1_5_1',
          },
          {
            text: '员工建议',
            name: 'feedback_list',
            level_id: '1_5_2',
          },
        ],
      },
    ],
  },
  {
    text: '单位组织',
    name: 'unitTeam',
    level_id: 5,
    subNav: [
      {
        text: '部门管理',
        name: 'departmentMage',
        level_id: '5_1',
        subNav: [
          {
            text: '一级部门',
            name: 'departmentMage_first',
            level_id: '5_1_1',
          },
          // {
          //   text: "二级部门",
          //   name: "departmentMage_second",
          //   level_id: '5_1_2'
          // },
          // {
          //   text: "三级部门",
          //   name: "departmentMage_third",
          //   level_id: '5_1_3'
          // },
        ],
      },
      {
        text: '员工管理',
        name: 'employeeMage',
        level_id: '5_2',
        subNav: [
          {
            text: '在职员工',
            name: 'employeeMage_onjob',
            level_id: '5_2_1',
          },
        ],
      },
    ],
  },
  {
    text: '平台管理',
    name: 'platform',
    level_id: 6,
    subNav: [
      {
        text: '流程管理',
        name: 'processMage',
        level_id: '6_1',
        subNav: [
          {
            text: '流程类型',
            name: 'processMage_type',
            level_id: '6_1_1',
          },
          {
            text: '流程设置',
            name: 'processMage_setting',
            level_id: '6_1_2',
          },
          {
            text: '表单类型',
            name: 'processMage_formType',
            level_id: '6_1_3',
          },
          {
            text: '表单设置',
            name: 'processMage_formSetting',
            level_id: '6_1_4',
          },
          {
            text: '流程权限转移',
            name: 'processMage_transform',
            level_id: '6_1_5',
          },
        ],
      },
      {
        text: '系统设置',
        name: 'systemMage',
        level_id: '6_2',
        subNav: [
          {
            text: '角色管理',
            name: 'systemMage_role',
            level_id: '6_2_1',
          },
          {
            text: '模块管理',
            name: 'systemMage_module',
            level_id: '6_2_2',
          },
          {
            text: '菜单管理',
            name: 'systemMage_menu',
            level_id: '6_2_3',
          },
          {
            text: '系统管理员',
            name: 'systemMage_admin',
            level_id: '6_2_4',
          },
        ],
      },
      {
        text: '公司设置',
        name: 'company',
        level_id: '6_3',
        subNav: [
          {
            text: '职位职级体系',
            name: 'company_rank',
            level_id: '6_3_1',
          },
          {
            text: '城市级别体系',
            name: 'company_city',
            level_id: '6_3_2',
          },
          {
            text: '人员类别管理',
            name: 'company_employee',
            level_id: '6_3_3',
          },
          {
            text: '会议室设置',
            name: 'company_meetingroom',
            level_id: '6_3_4',
          },
          {
            text: '节假日设置',
            name: 'company_holiday',
            level_id: '6_3_5',
          },
        ],
      },
    ],
  },
];

export function filterMenu() {}
