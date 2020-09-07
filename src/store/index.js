import Vue from 'vue'
import Vuex from 'vuex'
import Brands from "@/store/module/Brands";
import Category from "@/store/module/Category";
import Applicabilities from "@/store/module/Applicabilities";


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
      Brands,
      Category,
      Applicabilities,

  },
})
