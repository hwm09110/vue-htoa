import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';
import ViewUI from 'view-design';
import request from './request';
import Cookies from 'js-cookie';

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.prototype.$http = request;

import 'animate.css';
import 'view-design/dist/styles/iview';
import '@/assets/scss/reset';
import '@/assets/scss/common';
import '@/assets/css/resetIview'; //一些覆盖iview原有的样式


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
