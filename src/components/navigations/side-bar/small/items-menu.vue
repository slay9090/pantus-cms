<template>
  <router-link class="sidebar-expanded_link bg-dark list-group-item list-group-item-action"
               active-class="item-selected" :to="{ name: nameRouter}">
    <b-container class="my-0 mx-0 px-0 py-0 ">
      <b-row align-h="center">
        <b-col cols="auto" class="px-0">
          <slot name="itemicon">

          </slot>

        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="auto" class="px-0 d-flex align-items-center align-content-center justify-content-center">
          <small class="text-icon-descriptions">{{nameItem}}</small>
        </b-col>
      </b-row>
    </b-container>
  </router-link>
</template>

<script>
export default {
name: "items-menu",
  props: {
    nameItem: {
      type: String,
      default: 'No name'
    },
    nameRouter: {
      type: String,
      default: 'home'
    },

  },

}
</script>

<style scoped>


/* Menu item*/
#sidebar-container .list-group a {
  color: white;
}

/* Submenu item*/
#sidebar-container .list-group .sidebar-submenu a {
  height: 45px;
  padding-left: 30px;
}

/* Closed submenu icon */
#sidebar-container .list-group .list-group-item[aria-expanded="false"] .submenu-icon::after {
  content: " \f0d7";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}
/* Opened submenu icon */
#sidebar-container .list-group .list-group-item[aria-expanded="true"] .submenu-icon::after {
  content: " \f0da";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}


a.bg-dark:focus, a.bg-dark:hover, button.bg-dark:focus, button.bg-dark:hover {
  background-color: rgba(86, 122, 213, 0.5) !important;
}

.text-icon-descriptions {
  font-size: 0.6rem;
}
.icon-size {
  font-size: 1.3rem;
}
.sidebar-expanded_link {
  padding-bottom: 5px;
  padding-top: 5px;
}

</style>