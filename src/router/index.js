import router from './route';
import Cookies from 'js-cookie'


//全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log('from',from);
  // console.log('to',to);
  let title = to.meta.title;
  document.title = title;
  let isLogin = Cookies.get('isLogin');

  //验证访问url是否需要登录
  if(to.matched.some(record=>record.meta.checkAuth)){
    console.log('beforeEach',isLogin)
    if(isLogin){      
      next();
    }else{
      next('/login');
    }
  }else{
    next();
  }
})


export default router;
