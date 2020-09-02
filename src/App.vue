<template>
  <div id="app">
      <header>
      <div >
        <nav-bar />
      </div>
      </header>

      <div class="row" id="body-row">
          <SideBar />

            <div class="col py-3">

<!--              <b-breadcrumb :items="crumbs"></b-breadcrumb>-->
              <div class="text-muted">
              <breadcrumbs />
              </div>
<!--              <div>-->
<!--                <bread-crumbs :crumb-data="{{ $crumbs }}"></bread-crumbs>-->
<!--              </div>-->

<!--            <Crumbs />-->




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
