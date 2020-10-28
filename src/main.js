import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './app.vue'
import Vuex from 'vuex'
import VueRouter from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import TreeModel from 'tree-model'
Vue.use(VueVirtualScroller)
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false
Vue.use(BootstrapVueIcons);
Vue.use(BootstrapVue);
//Vue.use(TreeModel);


Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
 // Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
}




new Vue({
  VueRouter,
  Vuex,
  router,
  store,
  VueAxios,
  axios,
  TreeModel,

  render: h => h(App)
}).$mount('#app')
