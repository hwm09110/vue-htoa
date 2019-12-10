import Vue from 'vue';
import router from '@/router'
import http from '@/request'
import * as types from './mutations-type'
import { topNavList } from '@/common/menuData'

// 登出
const doLogout = ({commit}, status) => {
  http.doLogout().then(res => {
    if(res.code === '200'){
      commit('SET_ISLOGIN', null)
      localStorage.removeItem("isLogin")
      localStorage.removeItem("userInfo")
      Vue.prototype.$Message.success("退出成功")
      router.push({name: "login"})
    }else{
      Vue.prototype.$Message.warning("退出失败")
    }
  })
}

//拉取顶部导航
const getTopNavList = ({commit}) => {
  return http.getTopMenuList().then(res => {
    console.log('拉取顶部导航', res.extraData)
    commit(types.SET_TOPNAVLIST, topNavList)

  })
}



export default {
  doLogout,
  getTopNavList,
}
