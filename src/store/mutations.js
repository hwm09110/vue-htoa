import * as types from './mutations-type'

export default {
  [types.SET_ISLOGIN](state,status){
    state.isLogin = status
  },
  [types.SET_TOPMODULE](state,modules){
    state.topModules = modules
  },
}