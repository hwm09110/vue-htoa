import router from './route'
import store from '@/store'
import { setNavActiveItem } from '@/utils/routerManage'

const freeRouteList = ['login', 'forget', 'error']

//全局前置守卫
router.beforeEach(async (to, from, next) => {
  // console.log('from',from);
  // console.log('to',to);
  let title = to.meta.title
  let routerName = to.name
  let isLogin = localStorage.getItem('isLogin')

  if(document.title) {
    document.title = title
    let sitePaths = document.title.split('-')
    store.commit("SET_SITEPATHS", sitePaths)
  }

  if(!freeRouteList.includes(routerName)){
    if(!isLogin){
      await store.dispatch('getTopNavList') //拉取导航信息
      setNavActiveItem(to.path)
      next()
    }else{
      //手动跳转到登录页时，title不会变化，因此手动更新title
      document.title = '宏途E-HR'
      next({name: 'login'})
    }
  }else{
    next()
  }
})


export default router;
