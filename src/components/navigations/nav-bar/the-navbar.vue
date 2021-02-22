<template>
  <div>

    <div v-if="isViewSideBar" class="sidebar-panel">
      <div class="d-xl-none d-lg-none">
        <sidebar-small/>
      </div>
    </div>


    <b-navbar toggleable="md" class="navbar shadow" type="dark" >

      <b-navbar-brand :to="{ name: 'home'}" class="d-none d-md-flex">
                <b-img src="https://www.pantus.ru/images_uploader/images/logo_white.png"
                       alt="logo" />
      </b-navbar-brand>


      <div class="justify-content-between w-100 d-none d-md-flex" >

        <b-navbar-nav >
          <b-nav-item :to="{ name: 'Home'}" class="active">
            <i class="fa fa-home"></i>
            Home
          </b-nav-item>


          <b-nav-item :to="{ name: 'Home'}">
            <i class="fa fa-users"></i>
            Users
          </b-nav-item>

          <b-nav-item :to="{ name: 'Home'}">
            <i class="fa fa-phone">
              <span class="badge badge-primary">1</span>
            </i>
            Call
          </b-nav-item>





        </b-navbar-nav>


        <!-- Right aligned nav items -->
        <b-navbar-nav >

          <b-nav-item :to="{ name: 'Home'}">
            <i class="fa fa-bell">
              <span class="badge badge-danger">1</span>
            </i>
            Notify
          </b-nav-item>

          <b-nav-item :to="{ name: 'Home'}">
            <i class="fa fa-globe">
              <span class="badge badge-success">11</span>
            </i>
            Network
          </b-nav-item>
          <b-nav-item @click="logout">
            <i class="fa fa-sign-in"></i>
            {{ isUserName }}
          </b-nav-item>
        </b-navbar-nav>
      </div>


      <b-navbar-nav class="d-md-none d-block">
      <b-nav-item-dropdown text="Меню" >
        <b-dropdown-item :to="{ name: 'Home'}"><i class="fa fa-home"></i>
          Home</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'Home'}"> <i class="fa fa-users"></i>
          Users
        </b-dropdown-item>
        <b-dropdown-item :to="{ name: 'Home'}">
          <i class="fa fa-phone"><span class="badge badge-primary">1</span></i>
          sdsf
        </b-dropdown-item>
        <b-dropdown-item :to="{ name: 'Home'}">
          <i class="fa fa-bell"><span class="badge badge-danger">1</span></i>
        notify
        </b-dropdown-item>

        <hr>

        <b-dropdown-item :to="{ name: 'Home'}">
          <i class="fa fa-globe">
            <span class="badge badge-success">11</span>
          </i>
          network
        </b-dropdown-item>
        <b-dropdown-item @click="logout">
          <i class="fa fa-sign-in"></i>
          {{ isUserName }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
      </b-navbar-nav>


      <b-navbar-toggle target="navbar-toggle-collapse" @click="isViewSideBar = !isViewSideBar" class="btn-collapse-nav">
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>

      </b-collapse>
    </b-navbar>




  </div>





</template>

<script>
import SidebarSmall from "@/components/navigations/side-bar/small/sidebar-small";
export default {
  name: "NavBar",
  components: {SidebarSmall},

  data(){
    return{
      isViewSideBar: false
    }
  },

  computed : {
   isLoggedIn : function(){
     return this.$store.getters['Authentication/isLoggedIn']
   },
   isUserName :  function(){
     return  this.$store.getters['Authentication/isUserName']
   },

  },
  methods: {
    logout: function () {
      this.$store.dispatch('Authentication/logout')
          .then(() => {
            this.$router.push('/login')
          })
    }
  },

}
</script>

<style scoped>



 .navbar{
   z-index: 10;
   background-color: #567AD5;
   height: 75px;

 }

.btn-collapse-nav{
  align-self: flex-start;
  margin-top: 7px;
}

 .navbar i {

     position: relative;
     width: 36px;
     font-size: 24px;
   align-self: center;
 }

 .badge{
     font-size: 0.75rem;
     position: absolute;
     right: 0;
     font-family: sans-serif;
     top: -5px;
 }

 .nav-link{
   display: flex;
   flex-direction: column;
   text-align: center;
   line-height: 26px;
 }



 .sidebar-panel{
   z-index: 1;
   position: fixed;
   top: 0;
   height: 100vh;
 }

</style>
