import Vue from 'vue'
import Vuex from 'vuex'
import CatalogBrands from "@/store/module/catalog/Brands";
import CatalogCategories from "@/store/module/catalog/Categories";
import CatalogApplicabilities from "@/store/module/catalog/Applicabilities";
import NewsArticles from "@/store/module/news/Articles"
import NewsCategory from "@/store/module/news/Category"
import Authentication from "@/store/module/services/Authentication"
import ProductParts from "@/store/module/products/Parts";
import FileManager from "@/store/module/services/File-manager";


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
      CatalogBrands,
      CatalogCategories,
      CatalogApplicabilities,
      NewsArticles,
      NewsCategory,
      Authentication,
      ProductParts,
      FileManager,

  },
})
