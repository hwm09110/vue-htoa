/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */

const state = {
  //登录状态
  isLogin:false,
  //顶部 module
  topModules:[]
};

export default state;