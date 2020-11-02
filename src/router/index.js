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
        title: 'xxxx',
          requiresAuth: true,
      }

  },
      {
          path: '*',
          name: '404',
          component: () => import('../components/client-error'),
      },

      {
          path: '/login',
          name: 'Login',
          component: () => import('../components/login'),

      },
      {
          path: '/test',
          name: 'Test',
          component: () => import('../components/test-bench/Test'),

      },

        {
          path: '/catalog',
          component: Home,
          name: 'Home2',

            meta: {
                requiresAuth: true,
              breadcrumb: [
                { name: 'catalog' }
              ]
            }
        },

        {

          path: '/catalog/brands',
          name: 'Brands',
          component: () => import('../views/catalog/brands-view.vue'),
            props: route => ({ query: route.query.page }),
          meta: {
              title: 'xxxx',
              requiresAuth: true,

            breadcrumb: [
              { name: 'catalog' },
              { name: 'brands' }
            ]
          }

        },

        { path: '/catalog/brands/edit',
          component: () => import('../components/catalog/brands/brands-edit.vue'),
          props: route => ({ query: route.query.id }),
            meta: {
                requiresAuth: true,
            }

        },

        {

          path: '/catalog/category',
          name: 'CatalogCategory',
          component: () => import('../views/catalog/categories-view'),
          meta: {
              requiresAuth: true,
            breadcrumb: [
              { name: 'catalog' },
              { name: 'category' }
            ]
          }

        },



            { path: '/catalog/category/edit',
                name: 'categoryEdit',
              component: () => import('../components/catalog/category/category-edit'),
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
      //     component: () => import('../components/catalog/category/CatalogCategoryFormEdit'),
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
              component: () => import('../components/catalog/category/category-create'),
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
          component: () => import('../views/catalog/applicabilities-view'),
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'catalog' },
                  { name: 'applicabilities' }
              ]
          }

      },



      { path: '/catalog/applicabilities/edit',
          component: () => import('../components/catalog/applicabilities/applicabilities-edit'),
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
          component: () => import('../components/catalog/applicabilities/applicabilities-create'),
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
          component: () => import('../views/news/category-view'),
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
          component: () => import('../views/news/article-view'),
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Новости' },
                  { name: 'Статьи' }
              ]
          }

      },
      { path: '/news/articles/edit',
          component: () => import('../components/news/articles/articles-edit'),
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
          component: () => import('../components/news/articles/articles-create'),
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
          component: () => import('../views/products/parts-view'),
          meta: {
              requiresAuth: true,
              breadcrumb: [
                  { name: 'Продукты' },
                  { name: 'Список' }
              ]
          }
      },

      { path: '/products/list/edit',
          component: () => import('../components/products/edit/product-editor'),
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
        if (store.getters['Authentication/isLoggedIn']) {
            next()
            return
        }
        next('/login111')
    } else {
        next()
    }
})



export default router


