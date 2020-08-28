import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from './router'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'






Vue.config.productionTip = false

new Vue({
  VueRouter,
  BootstrapVue,
  Vuex,
  router,
  store,

  render: h => h(App)
}).$mount('#app')
