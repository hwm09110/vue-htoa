import * as types from './mutations-type'

export default {
  [types.SET_ISLOGIN](state, status){
    state.isLogin = status
  },
  [types.SET_TOPNAVLIST](state, topNavList){
    state.topNavList = topNavList
  },
  [types.SET_LEFTNAVLIST](state, leftNavList){
    state.leftNavList = leftNavList
  },
}