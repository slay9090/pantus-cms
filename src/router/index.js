import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/"

import login from '@/router/module/login';
import home from "@/router/module/home";
import page404 from "@/router/module/page-not-found"
import catalog from "@/router/module/catalog/catalog";
import catalogBrands from "@/router/module/catalog/brands";
import catalogCategory from "@/router/module/catalog/category";
import catalogApplicabilities from "@/router/module/catalog/applicabilities";
import newsCategories from "@/router/module/news/categories";
import newsArticles from "@/router/module/news/articles";
import productsList from "@/router/module/products/list";
import test from "@/router/module/test";
import orders from "@/router/module/crm/orders";

Vue.use(VueRouter)

  const routes = [
      ...test,
      ...login,
      ...home,
      ...page404,
      ...catalog,
      ...catalogBrands,
      ...catalogCategory,
      ...catalogApplicabilities,
      ...newsCategories,
      ...newsArticles,
      ...productsList,
      ...orders,


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['Authentication/isLoggedIn']) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router


