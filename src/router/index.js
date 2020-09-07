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
                        { name: 'Категории', link: '/catalog/category/' },
                        { name: 'Изменение' },
                    ]
                }
            },

          { path: '/catalog/category/add',
              component: () => import('../components/catalog/Category/CatalogCategoryFormAdd'),
              name: 'categoryAdd',
                  meta: {
                      breadcrumb: [
                          { name: 'Каталог' },
                          { name: 'Категории', link: '/catalog/category/' },
                          { name: 'Создание' },
                      ]
                  }
          },



      {

          path: '/catalog/applicabilities',
          name: 'CatalogApplicabilities',
          component: () => import('../views/CatalogApplicabilities'),
          meta: {
              breadcrumb: [
                  { name: 'Catalog' },
                  { name: 'Applicabilities' }
              ]
          }

      },



      { path: '/catalog/applicabilities/edit',
          component: () => import('../components/catalog/Applicabilities/CatalogApplicabilitiesFormEdit'),
          props: route => ({ query: route.query.id }),
          meta: {
              breadcrumb: [
                  { name: 'Каталог' },
                  { name: 'Применяемости', link: '/catalog/applicabilities/' },
                  { name: 'Изменение' },
              ]
          }
      },

      { path: '/catalog/applicabilities/add',
          component: () => import('../components/catalog/Applicabilities/CatalogApplicabilitiesFormAdd'),
          name: 'applicabilitiesAdd',
          meta: {
              breadcrumb: [
                  { name: 'Каталог' },
                  { name: 'Применяемости', link: '/catalog/applicabilities/'  },
                  { name: 'Создание' },
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


