import Vue from 'vue'
import Vuex from 'vuex'
import CatalogBrands from "@/store/module/Catalog/Brands";
import CatalogCategories from "@/store/module/Catalog/Categories";
import CatalogApplicabilities from "@/store/module/Catalog/Applicabilities";
import NewsArticles from "@/store/module/News/Articles"
import NewsCategory from "@/store/module/News/Category"
import Authentication from "@/store/module/Service/Authentication"
import ProductParts from "@/store/module/Products/Parts";
import FileManager from "@/store/module/Service/File-manager";


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
