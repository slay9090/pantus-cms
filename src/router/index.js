import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "@/store/"

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

      meta: {
          requiresAuth: true,
      }

  },
      {
          path: '*',
          name: '404',
          component: () => import('../components/ClientError'),
      },

      {
          path: '/login',
          name: 'Login',
          component: () => import('../components/Login'),

      },
      {
          path: '/test',
          name: 'Test',
          component: () => import('../components/Test'),

      },

        {
          path: '/catalog',
          component: Home,
          name: 'Home2',

            meta: {
                requiresAuth: true,
              breadcrumb: [
                { name: 'Catalog' }
              ]
            }
        },

        {

          path: '/catalog/brands',
          name: 'Brands',
          component: () => import('../views/Catalog/CatalogBrands.vue'),
            props: route => ({ query: route.query.page }),
          meta: {
              requiresAuth: true,

            breadcrumb: [
              { name: 'Catalog' },
              { name: 'Brands' }
            ]
          }

        },

        { path: '/catalog/brands/edit',
          component: () => import('../components/catalog/Brands/CatalogBrandsFormEdit.vue'),
          props: route => ({ query: route.query.id }),
            meta: {
                requiresAuth: true,
            }

        },

        {

          path: '/catalog/category',
          name: 'CatalogCategory',
          component: () => import('../views/Catalog/CatalogCategories'),
          meta: {
              requiresAuth: true,
            breadcrumb: [
              { name: 'Catalog' },
              { name: 'Category' }
            ]
          }

        },



            { path: '/catalog/category/edit',
                name: 'categoryEdit',
              component: () => import('../components/catalog/Category/CatalogCategoryFormEdit'),
              props: route => ({ query: route.query.id }),
                meta: {
                    requiresAuth: true,
                    breadcrumb: [
                        { name: 'Каталог' },
                        { name: 'Категории', link: '/catalog/category/' },
                        { name: 'Изменение' },
                    ]
                }
            },

      // { path: '/catalog/category/edit?id=360',
      //     component: () => import('../components/catalog/Category/CatalogCategoryFormEdit'),
      //     props: route => ({ query: route.query.id }),
      //     meta: {
      //         requiresAuth: true,
      //         breadcrumb: [
      //             { name: 'Каталог' },
      //             { name: 'Категории1', link: '/catalog/category/' },
      //             { name: 'Изменение' },
      //         ]
      //     }
      // },


          { path: '/catalog/category/add',
              component: () => import('../components/catalog/Category/CatalogCategoryFormAdd'),
              name: 'categoryAdd',
                  meta: {
                      requiresAuth: true,
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
          component: () => import('../views/Catalog/CatalogApplicabilities'),
          meta: {
              requiresAuth: true,
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
              requiresAuth: true,
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
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Каталог' },
                  { name: 'Применяемости', link: '/catalog/applicabilities/'  },
                  { name: 'Создание' },
              ]
          }
      },


      {

          path: '/news/category',
          name: 'NewsCategory',
          component: () => import('../views/News/NewsCategory'),
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Новости' },
                  { name: 'Категории' }
              ]
          }

      },


      {

          path: '/news/articles',
          props: route => ({ query: route.query.page }),
          name: 'NewsArticles',
          component: () => import('../views/News/NewsArticle'),
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Новости' },
                  { name: 'Статьи' }
              ]
          }

      },
      { path: '/news/articles/edit',
          component: () => import('../components/news/Articles/FormEdit'),
          props: route => ({ query: route.query.id }),
          name: 'ArticlesFormEdit',
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Новости' },
                  { name: 'Статьи', link: '/news/articles/'  },
                  { name: 'Изменение' },
              ]
          }
      },
      { path: '/news/articles/add',
          component: () => import('../components/news/Articles/FormAdd'),
          name: 'ArticlesFormAdd',
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Новости' },
                  { name: 'Статьи', link: '/news/articles/'  },
                  { name: 'Добавление' },
              ]
          }
      },

      {
          path: '/products/list',
          props: route => ({ query: route.query.page }),
          name: 'ProductsList',
          component: () => import('../views/Products/ProductsParts'),
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Продукты' },
                  { name: 'Список' }
              ]
          }
      },

      { path: '/products/list/edit',
          component: () => import('../components/products/MainForm/FormEditor'),
          props: route => ({ query: route.query.id }),
          name: 'ProductFormEdit',
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Продукты' },
                  { name: 'Список', link: '/products/list/'  },
                  { name: 'Изменение' },
              ]
          }
      },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {

        //console.log( 'skot' + store.getters['Authentication/isLoggedIn']);
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


