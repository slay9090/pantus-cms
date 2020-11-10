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
import VueVirtualScroller from 'vue-virtual-scroller'
import TreeModel from 'tree-model'


Vue.use(VueVirtualScroller)
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false
Vue.use(BootstrapVueIcons);
Vue.use(BootstrapVue);


Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
//  Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
}


import baseButton from '@/components/base/base-button'
import searchInput from '@/components/base/input/search-input'
import indexInput from '@/components/base/input/index-input'
import previewRequestBody from '@/components/base/preview-request-body'
import htmlEditorInput from '@/components/base/input/html-editor'
Vue.component("base-button", baseButton);
Vue.component("search-input", searchInput);
Vue.component("index-input", indexInput);
Vue.component("preview-request-body", previewRequestBody);
Vue.component("html-editor", htmlEditorInput);



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
