import Vue from 'vue'
import Vuex from 'vuex'
import CatalogBrands from "@/store/module/catalog/brands";
import CatalogCategories from "@/store/module/catalog/categories";
import CatalogApplicabilities from "@/store/module/catalog/applicabilities";
import NewsArticles from "@/store/module/news/articles"
import NewsCategory from "@/store/module/news/category"
import Authentication from "@/store/module/services/authentication"
import ProductParts from "@/store/module/products/parts";
import FileManager from "@/store/module/services/file-manager";


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
