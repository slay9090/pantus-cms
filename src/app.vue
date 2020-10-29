<template>
  <div id="app" >
    <div class="" v-if="forbidden">
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
    }
  },


  computed: {
    forbidden () {
    //  return !!localStorage.getItem('token')
      return this.$store.getters["Authentication/isUserName"]
    }
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
