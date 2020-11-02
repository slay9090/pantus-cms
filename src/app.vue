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
        <div class="col-10 py-3">
          <div class="text-muted">
            <breadcrumbs/>

          </div>
          <!-- DYNAMIC PAGES -->
          <router-view/>

        </div>
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
</style>


<script>
// @ is an alias to /src
import NavBar from '@/components/nav-bar'
import SideBar from "@/components/side-bar";
import Breadcrumbs from './components/bread-crumbs'
import login from "@/components/login"

import Axios from 'axios'

export default {
  name: 'Home',
  components: {
    NavBar,
    SideBar,
    Breadcrumbs,
    login,
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

      await Axios.get("http://adm.pantus.ru:8081/api/catalog/testprotected").then(res => {
        if (res.data.text !== 'THIS IS PROTECTED') {
          this.logout();
        }
      })
          .catch(err => {
            console.log('BAD TOKEN ', err)
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
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("Authentication/logout")
        }
        throw err;
      });
    });

  }
}
</script>
