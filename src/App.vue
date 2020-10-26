<template>
  <div id="app">
      <header>
      <div >
        <nav-bar />
      </div>
      </header>

      <div class="d-flex " id="body-row">
          <SideBar />
            <div class="col-10 py-3">
              <div class="text-muted">
              <breadcrumbs />

              </div>
              <!-- DYNAMIC PAGES -->
                <router-view/>

              </div>
            <!-- Main Col END -->

          </div>
        <!-- body-row END -->
  </div>


</template>


<style>
*:focus {
  outline: none;
}
</style>


<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import SideBar from "@/components/SideBar";
import Breadcrumbs from './components/Breadcrumbs'

export default {
  name: 'Home',
  components: {
    NavBar,
    SideBar,
    Breadcrumbs,
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
