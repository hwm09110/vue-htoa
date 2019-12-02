/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */

const state = {
  //登录状态
  isLogin:false,
  topNavList: [], //顶部导航菜单
  topNavActive: "", //顶部 active 项
  leftNavList: [], //左侧导航菜单
  leftNavOpen: [], //左侧导航菜单,展开项
  leftNavActive: null, //左侧导航菜单 active 项
};

export default state;