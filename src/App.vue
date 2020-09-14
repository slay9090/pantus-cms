<template>
  <div id="app">
      <header>
      <div >
        <nav-bar />
      </div>
      </header>

      <div class="d-flex" id="body-row">
          <SideBar />
            <div class="col py-3">
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
}
</script>
