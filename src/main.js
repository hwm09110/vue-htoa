import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';
import iView from 'iview';

Vue.config.productionTip = false
Vue.use(iView);

import '@/assets/scss/reset';
import 'iview/dist/styles/iview.css';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
