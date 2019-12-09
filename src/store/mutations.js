import * as types from './mutations-type'

export default {
  [types.SET_ISLOGIN](state, status){
    state.isLogin = status
  },
  [types.SET_USERINFO](state, userInfo){
    state.userInfo = userInfo
  },
  [types.SET_TOPNAVLIST](state, topNavList){
    state.topNavList = topNavList
  },
  [types.SET_LEFTNAVLIST](state, leftNavList){
    state.leftNavList = leftNavList
  },
  [types.SET_MYNAVLIST](state, myNavList){
    state.myNavList = myNavList
  },
  [types.SET_SITEPATHS](state, sitePaths){
    state.sitePaths = sitePaths
  },
}