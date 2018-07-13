// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './vuex/store'
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

import KikoMessage from './components/message/index.js'
import alert from './components/alert/index.vue'
import loading from './components/loading/index.vue';

Vue.config.productionTip = false
Vue.component(KikoMessage.name, KikoMessage);
Vue.component(alert.name, alert);
Vue.component(loading.name, loading);
Vue.prototype.$message = KikoMessage.installMessage;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
