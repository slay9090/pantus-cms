import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap-vue/dist/bootstrap-vue.css'






Vue.config.productionTip = false

new Vue({
  VueRouter,
  BootstrapVue,
  Vuex,
  router,
  store,
  VueAxios,
  axios,
  BootstrapVueIcons,

  render: h => h(App)
}).$mount('#app')
