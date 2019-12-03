/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */

const state = {
  isLogin: localStorage.getItem('isLogin') || 0, //登录状态

  topNavList: [], //顶部导航菜单
  topNavActive: "", //顶部 active 项

  myNavList: [], //左侧导航菜单（我的待办、我的申请、通知中心、通讯录）
  myNavActive: null, //active 项

  leftNavList: [], //左侧导航菜单
  leftNavOpen: [], //左侧导航菜单,展开项
  leftNavActive: null, //左侧导航菜单 active 项

  sitePaths: [], //当前页面路径
};

export default state;