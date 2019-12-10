// 流程管理
const Type = () =>
  import(
    /* webpackChunkName: "processMage" */
    '../../views/platform/processMage/Type.vue'
  );
const Setting = () =>
  import(
    /* webpackChunkName: "processMage" */
    '../../views/platform/processMage/Setting.vue'
  );
const FormType = () =>
  import(
    /* webpackChunkName: "processMage" */
    '../../views/platform/processMage/FormType.vue'
  );
const FormSetting = () =>
  import(
    /* webpackChunkName: "processMage" */
    '../../views/platform/processMage/FormSetting.vue'
  );
const Transform = () =>
  import(
    /* webpackChunkName: "processMage" */
    '../../views/platform/processMage/Transform.vue'
  );

// 系统设置
const Role = () =>
  import(
    /* webpackChunkName: "systemMage" */
    '../../views/platform/systemMage/Role.vue'
  );
const Module = () =>
  import(
    /* webpackChunkName: "systemMage" */
    '../../views/platform/systemMage/Module.vue'
  );
const Menu = () =>
  import(
    /* webpackChunkName: "systemMage" */
    '../../views/platform/systemMage/Menu.vue'
  );
const Admin = () =>
  import(
    /* webpackChunkName: "systemMage" */
    '../../views/platform/systemMage/Admin.vue'
  );

// 公司设置
const Rank = () =>
  import(
    /* webpackChunkName: "company" */
    '../../views/platform/companyMage/Rank.vue'
  );
const City = () =>
  import(
    /* webpackChunkName: "company" */
    '../../views/platform/companyMage/City.vue'
  );
const Employee = () =>
  import(
    /* webpackChunkName: "company" */
    '../../views/platform/companyMage/Employee.vue'
  );
const Meetingroom = () =>
  import(
    /* webpackChunkName: "company" */
    '../../views/platform/companyMage/Meetingroom.vue'
  );
const Holiday = () =>
  import(
    /* webpackChunkName: "company" */
    '../../views/platform/companyMage/Holiday.vue'
  );
export default [
  // 流程管理
  {
    path: 'platform/processMage/type',
    name: 'processMage_type',
    meta: {title: '流程管理-流程类型'},
    component: Type,
  },
  {
    path: 'platform/processMage/setting',
    name: 'processMage_setting',
    meta: {title: '流程管理-流程设置'},
    component: Setting,
  },
  {
    path: 'platform/processMage/formType',
    name: 'processMage_formType',
    meta: {title: '流程管理-表单类型'},
    component: FormType,
  },
  {
    path: 'platform/processMage/formSetting',
    name: 'processMage_formSetting',
    meta: {title: '流程管理-表单设置'},
    component: FormSetting,
  },
  {
    path: 'platform/processMage/transform',
    name: 'processMage_transform',
    meta: {title: '流程管理-流程权限转移'},
    component: Transform,
  },

  // 系统设置
  {
    path: 'platform/systemMage/role',
    name: 'systemMage_role',
    meta: {title: '系统设置-角色管理'},
    component: Role,
  },
  {
    path: 'platform/systemMage/module',
    name: 'systemMage_module',
    meta: {title: '系统设置-模块管理'},
    component: Module,
  },
  {
    path: 'platform/systemMage/menu',
    name: 'systemMage_menu',
    meta: {title: '系统设置-菜单管理'},
    component: Menu,
  },
  {
    path: 'platform/systemMage/admin',
    name: 'systemMage_admin',
    meta: {title: '系统设置-系统管理员'},
    component: Admin,
  },

  // 公司设置
  {
    path: 'platform/company/rank',
    name: 'company_rank',
    meta: {title: '公司设置-职位职级体系'},
    component: Rank,
  },
  {
    path: 'platform/company/city',
    name: 'company_city',
    meta: {title: '公司设置-城市级别体系'},
    component: City,
  },
  {
    path: 'platform/company/employee',
    name: 'company_employee',
    meta: {title: '公司设置-人员类别管理'},
    component: Employee,
  },
  {
    path: 'platform/company/meetingroom',
    name: 'company_meetingroom',
    meta: {title: '公司设置-会议室设置'},
    component: Meetingroom,
  },
  {
    path: 'platform/company/holiday',
    name: 'company_holiday',
    meta: {title: '公司设置-节假日设置'},
    component: Holiday,
  },
];
