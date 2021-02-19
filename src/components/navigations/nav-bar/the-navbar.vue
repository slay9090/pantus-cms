<template>
  <div>
    <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark shadow" style="background-color: #567AD5">


      <router-link :to="{ name: 'home'}">
        <b-img src="https://www.pantus.ru/images_uploader/images/logo_white.png"
               alt="logo" style="opacity: 1"/>
      </router-link>

      <button class="navbar-toggler" @click="isViewSideBar = !isViewSideBar" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="{ name: 'Home'}" class="nav-link" href="#">
              <i class="fa fa-home"></i>
              Home
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fa fa-users"></i>
              Link
            </a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-phone">
                <span class="badge badge-primary">1</span>
              </i>
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav ">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fa fa-bell">
                <span class="badge badge-danger">1</span>
              </i>
              Test
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fa fa-globe">
                <span class="badge badge-success">11</span>
              </i>
              Test
            </a>
          </li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item">
            <a class="nav-link" @click="logout">
              <i class="fa fa-sign-in"></i>
              {{ isUserName }}
            </a>
          </li>
        </ul>

      </div>



    </nav>

    <div v-if="isViewSideBar" class="sidebar-panel">
      <div class="d-xl-none d-lg-none">
        <sidebar-small/>
      </div>
    </div>
  </div>

<!--  <b-navbar toggleable="sm" type="dark" variant="dark">-->
<!--    <b-navbar-brand href="#">NavBar</b-navbar-brand>-->

<!--    <b-navbar-toggle target="navbar-toggle-collapse">-->
<!--&lt;!&ndash;    <template #default="{ expanded }">&ndash;&gt;-->
<!--&lt;!&ndash;      <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>&ndash;&gt;-->
<!--&lt;!&ndash;      <b-icon v-else icon="chevron-bar-down"></b-icon>&ndash;&gt;-->
<!--&lt;!&ndash;    </template>&ndash;&gt;-->
<!--  </b-navbar-toggle>-->

<!--    <b-collapse id="navbar-toggle-collapse" is-nav>-->
<!--&lt;!&ndash;      <b-navbar-nav class="ml-auto">&ndash;&gt;-->
<!--&lt;!&ndash;        <b-nav-item href="#">Link 1</b-nav-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <b-nav-item href="#">Link 2</b-nav-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <b-nav-item href="#" disabled>Disabled</b-nav-item>&ndash;&gt;-->
<!--&lt;!&ndash;      </b-navbar-nav>&ndash;&gt;-->
<!--      <div class="sidebar-panel d-xl-none d-lg-none">-->
<!--        <sidebar-small />-->
<!--      </div>-->
<!--    </b-collapse>-->
<!--  </b-navbar>-->



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

<style>

 a {
  cursor: pointer;
}

 .navbar{
   z-index: 10;
 }

.navbar-icon-top .navbar-nav .nav-link > .fa {
  position: relative;
  width: 36px;
  font-size: 24px;
}

.navbar-icon-top .navbar-nav .nav-link > .fa > .badge {
  font-size: 0.75rem;
  position: absolute;
  right: 0;
  font-family: sans-serif;
}

.navbar-icon-top .navbar-nav .nav-link > .fa {
  top: 3px;
  line-height: 12px;
}

.navbar-icon-top .navbar-nav .nav-link > .fa > .badge {
  top: -10px;
}

@media (min-width: 576px) {
  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link {
    text-align: center;
    display: table-cell;
    height: 70px;
    vertical-align: middle;
    padding-top: 0;
    padding-bottom: 0;
  }

  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link > .fa {
    display: block;
    width: 48px;
    margin: 2px auto 4px auto;
    top: 0;
    line-height: 24px;
  }

  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link > .fa > .badge {
    top: -7px;
  }
}

@media (min-width: 768px) {
  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link {
    text-align: center;
    display: table-cell;
    height: 70px;
    vertical-align: middle;
    padding-top: 0;
    padding-bottom: 0;
  }

  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link > .fa {
    display: block;
    width: 48px;
    margin: 2px auto 4px auto;
    top: 0;
    line-height: 24px;
  }

  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link > .fa > .badge {
    top: -7px;
  }
}

@media (min-width: 992px) {
  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link {
    text-align: center;
    display: table-cell;
    height: 70px;
    vertical-align: middle;
    padding-top: 0;
    padding-bottom: 0;
  }

  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link > .fa {
    display: block;
    width: 48px;
    margin: 2px auto 4px auto;
    top: 0;
    line-height: 24px;
  }

  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link > .fa > .badge {
    top: -7px;
  }
}

@media (min-width: 1200px) {
  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link {
    text-align: center;
    display: table-cell;
    height: 70px;
    vertical-align: middle;
    padding-top: 0;
    padding-bottom: 0;
  }

  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link > .fa {
    display: block;
    width: 48px;
    margin: 2px auto 4px auto;
    top: 0;
    line-height: 24px;
  }

  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link > .fa > .badge {
    top: -7px;
  }
}

 .sidebar-panel{
   z-index: 1;
   position: fixed;
   top: 0;
   height: 100vh;
 }

</style>
