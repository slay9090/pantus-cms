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
import textInput from '@/components/base/input/text-input'
import limitDataTable from '@/components/base/table/static-table'
import slugInput from '@/components/base/input/slug-input'
import priceInput from '@/components/base/input/price-input'
import textArea from '@/components/base/input/text-area'
import skuInput from '@/components/base/input/sku-input'

Vue.component("button-base", baseButton);
Vue.component("input-search", searchInput);
Vue.component("input-index", indexInput);
Vue.component("preview-request-body", previewRequestBody);
Vue.component("editor-html", htmlEditorInput);
Vue.component("input-text", textInput);
Vue.component("table-static", limitDataTable);
Vue.component("input-slug", slugInput);
Vue.component("input-price", priceInput);
Vue.component("text-area", textArea);
Vue.component("input-sku", skuInput);




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
