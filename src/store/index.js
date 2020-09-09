import Vue from 'vue'
import Vuex from 'vuex'
import Brands from "@/store/module/Catalog/Brands";
import Category from "@/store/module/Catalog/Category";
import Applicabilities from "@/store/module/Catalog/Applicabilities";
import News from "@/store/module/News/Articles"


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
      Brands,
      Category,
      Applicabilities,
      News,

  },
})
