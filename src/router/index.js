import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// import VueBreadcrumbs from 'vue-2-breadcrumbs'
//
// Vue.use(VueBreadcrumbs,{
//   template:
//       '            <ul class="breadcrumb">\n' +
//       '                <li v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb" :key="key" class="breadcrumb-item active" aria-current="page">\n' +
//       '                    <router-link :to="{ path: getPath(crumb) }">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>' +
//       '                </li>\n' +
//       '            </ul>\n'
// })



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,



  },



        {
          path: '/catalog',
          component: Home,
          name: 'Home2',

            meta: {
              breadcrumb: [
                { name: 'Catalog' }
              ]
            }



        },

        {

          path: '/catalog/brands',
          name: 'Brands',
          component: () => import('../views/CatalogBrands.vue'),
          meta: {
            breadcrumb: [
              { name: 'Catalog' },
              { name: 'Brands' }
            ]
          }

        },

        { path: '/catalog/brands/edit',
          component: () => import('../components/catalog/Brands/CatalogBrandsFormEdit.vue'),
          props: route => ({ query: route.query.id })
        },

        {

          path: '/catalog/category',
          name: 'CatalogCategory',
          component: () => import('../views/CatalogCategory'),
          meta: {
            breadcrumb: [
              { name: 'Catalog' },
              { name: 'Category' }
            ]
          }

        },



            { path: '/catalog/category/edit',
              component: () => import('../components/catalog/Category/CatalogCategoryFormEdit'),
              props: route => ({ query: route.query.id }),



                meta: {
                    breadcrumb: [
                        { name: 'Каталог' },
                        { name: 'Категории' },
                        { name: 'Редактор' },
                    ]
                }


            },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

