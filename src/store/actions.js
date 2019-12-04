import * as types from './mutations-type'
import { topNavList } from '@/common/menuData'

//拉取顶部导航
const getTopNavList = ({commit}) => {
  
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      commit(types.SET_TOPNAVLIST, topNavList)
      resolve()
    }, 200)
  })
}

//存储登录态
const setLoginStatus = ({commit},status) => {
  console.log('dispatch-setLoginStatus',status)
  commit(types.SET_ISLOGIN, status)
}


export default {
  getTopNavList,
  setLoginStatus
}
