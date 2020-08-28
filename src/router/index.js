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
          component: () => import('../views/Brands.vue'),
          meta: {
            breadcrumb: [
              { name: 'Catalog' },
              { name: 'Brands' }
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


