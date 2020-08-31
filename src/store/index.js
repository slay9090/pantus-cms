import Vue from 'vue'
import Vuex from 'vuex'
import Brands from "@/store/module/Brands";


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
   Brands,

  },
})
