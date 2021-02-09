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
import {baseFunc} from '@/mixins/global'
Vue.prototype.$globalFunc = baseFunc

// import { VueMaskDirective } from 'v-mask'
// Vue.directive('mask', VueMaskDirective);

import VueMask from 'v-mask'
Vue.use(VueMask);


/// Валидаторы
import { ValidationProvider, ValidationObserver } from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { localize } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru.json';
localize('ru', ru);
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
/// -- Валидаторы


import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


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
import textInput from '@/components/base/input/bottle-input'
import slugInput from '@/components/base/input/slug-input'
import priceInput from '@/components/base/input/price-input'
import textArea from '@/components/base/input/text-area'
import skuInput from '@/components/base/input/sku-input'
import dynamicTable from '@/components/base/table/dynamic-table/index'
import staticTable from '@/components/base/table/static-table/static-table'
import phoneInput from '@/components/base/input/phone-input'

Vue.component("button-base", baseButton);
Vue.component("input-search", searchInput);
Vue.component("input-index", indexInput);
Vue.component("preview-request-body", previewRequestBody);
Vue.component("editor-html", htmlEditorInput);
Vue.component("input-text", textInput);
Vue.component("table-static", staticTable);
Vue.component("input-slug", slugInput);
Vue.component("input-price", priceInput);
Vue.component("text-area", textArea);
Vue.component("input-sku", skuInput);
Vue.component("table-dynamic", dynamicTable);
Vue.component("input-phone", phoneInput);

import BTextInput from "@/components/base/input/BTextInput";
import BTextArea from "@/components/base/input/BTextArea";
import BSelect from "@/components/base/input/BSelect";
import BRadio from "@/components/base/input/BRadio";
import BHtml from "@/components/base/input/BHtml";
import BTagsInput from "@/components/base/input/BTagsInput";
Vue.component("BTextInput", BTextInput);
Vue.component("BTextArea", BTextArea);
Vue.component("BSelect", BSelect);
Vue.component("BRadio", BRadio);
Vue.component("BHtml", BHtml);
Vue.component("BTagsInput", BTagsInput);




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
