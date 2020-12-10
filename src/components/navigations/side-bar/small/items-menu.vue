<template>
  <router-link class="sidebar-expanded_link bg-dark list-group-item list-group-item-action"
               :active-class="activeItem ? 'item-selected' : null"
               :to="{ name: nameRouter}"

  >
    <b-container class="my-0 mx-0 px-0 py-0 ">
      <b-row align-h="center">
        <b-col cols="auto" class="px-0">
         <slot name="itemicon" ></slot>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="auto" class="px-0 d-flex align-items-center align-content-center justify-content-center">
          <small class="text-icon-descriptions">{{nameItem}}<span v-if="collapseIcon" class="submenu-icon"></span></small>
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
      default: null
    },

    collapseIcon: {
      type: Boolean,
      default: false,
    },

    activeItem: {
      type: Boolean,
      default: false,
    },

  },

}
</script>

<style scoped>

.sidebar-expanded_link {
  padding-bottom: 5px;
  padding-top: 10px;
}

.item-selected {
  background-color: rgba(86, 122, 213, 1) !important;
  box-shadow: 3px 3px 1px 0px rgba(0,0,0,0.75);
  z-index: 2;
}

.text-icon-descriptions {
  /*font-size: 0.7rem;*/
}

/* Closed submenu icon */
#sidebar-container-small .list-group .list-group-item[aria-expanded="false"] .submenu-icon::after {
  content: " \f0d7";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}
/* Opened submenu icon */
#sidebar-container-small .list-group .list-group-item[aria-expanded="true"] .submenu-icon::after {
  content: " \f0da";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}


</style>