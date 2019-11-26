import * as types from './mutations-type'

//拉取top module
const getTopModule = ({commit}) => {
  setTimeout(()=>{
    const modules = [
      {name:'首页',path:'/home',isActive:true},
      {name:'新闻中心',path:'/home',isActive:false},
      {name:'行政人事',path:'/home',isActive:false},
      {name:'个人办公',path:'/home',isActive:false}
    ]
    commit(types.SET_TOPMODULE,modules)
  },3000)
}

//存储登录态
const setLoginStatus = ({commit},status) => {
  console.log('dispatch-setLoginStatus',status)
  commit(types.SET_ISLOGIN, status)
}


export default {
  getTopModule,
  setLoginStatus
}
