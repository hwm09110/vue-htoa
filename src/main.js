import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';
import ViewUI from 'view-design';
import request from './request';
import Cookies from 'js-cookie';

Vue.config.productionTip = false
Vue.use(ViewUI);
// 挂载request到Vue property
Vue.prototype.$http = request;

import 'view-design/dist/styles/iview.css';
import '@/assets/scss/reset';
import 'animate.css';

//刷新页面后，vuex依旧保存者登录态
let isLogin = Cookies.get('isLogin');
if(isLogin){
  store.dispatch('setLoginStatus',isLogin);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
