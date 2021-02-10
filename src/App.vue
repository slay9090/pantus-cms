<template>
  <div id="app">

    <div class="" v-if="isLoggedIn">
      <header>
        <div>
          <nav-bar/>
        </div>
      </header>

      <div class="d-flex " id="body-row">
        <SideBar/>
        <b-container fluid class="my-4">
          <b-container fluid>
            <b-row>
              <b-col>
                <div class="text-muted">
                  <breadcrumbs/>
                  <alert />
                </div>
              </b-col>
            </b-row>
          </b-container>


          <!-- DYNAMIC PAGES -->
          <router-view/>


        </b-container>
        <!-- Main Col END -->

      </div>
      <!-- body-row END -->
    </div>

    <div class="div" v-else>
      <login class=""></login>
    </div>

  </div>

</template>


<style>
*:focus {
  outline: none;
}
/*вынести в базовые*/
.card {
  min-width: 290px;
}
</style>


<script>
// @ is an alias to /src

import NavBar from '@/components/navigations/nav-bar/the-navbar';
import SideBar from "@/components/navigations/side-bar/sidebar-index";
import Breadcrumbs from './components/navigations/the-breadcrumbs';
import login from "@/pages/login";
import Axios from 'axios';
import Alert from '@/components/alert/index'



export default {
  name: 'Home',
  components: {

    NavBar,
    SideBar,
    Breadcrumbs,
    login,
    Alert,
  },

  data() {
    return {
      check: false,

    }
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters["Authentication/isLoggedIn"]
    }
  },

  methods: {

    logout: function () {
      this.$store.dispatch('Authentication/logout')
          .then(() => {
            if (this.$route.fullPath !== '/login'){
              this.$router.push('/login')
            }
          })
    },

    async forbidden() {

      await Axios.get("https://auth.pantus.ru/api/catalog/testprotected").then(res => {
        if (res.data.text !== 'THIS IS PROTECTED') {
          this.logout();
        }
      })
          .catch(err => {
            console.log('BAD TOKEN or NULL', err, )
            console.log('token value= ', localStorage.getItem('token'))
            this.logout();
          });
    }
  },

  mounted() {

    this.forbidden();
  },

  //Обработка просроченных токенов
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 403 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("Authentication/logout")
        }
        throw err;
      });
    });

  }
}
</script>
