import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';
import iView from 'iview';
import request from './request';

Vue.config.productionTip = false
Vue.use(iView);
// 挂载request到Vue property
Vue.prototype.request = request;

import '@/assets/scss/reset';
import 'iview/dist/styles/iview.css';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
