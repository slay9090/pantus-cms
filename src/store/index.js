import Vue from 'vue'
import Vuex from 'vuex'
import CatalogBrands from "@/store/module/Catalog/Brands";
import CatalogCategory from "@/store/module/Catalog/Category";
import CatalogApplicabilities from "@/store/module/Catalog/Applicabilities";
import NewsArticles from "@/store/module/News/Articles"
import NewsCategory from "@/store/module/News/Category"


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
      CatalogBrands,
      CatalogCategory,
      CatalogApplicabilities,
      NewsArticles,
      NewsCategory,

  },
})
