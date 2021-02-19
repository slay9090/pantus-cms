<template>
<div class="">
  <div class="sidebar-panel d-none d-lg-block ">
    <side-bar-long />

  </div >

<!--  <div class="sidebar-panel d-xl-none d-lg-none">-->
<!--    <sidebar-small />-->
<!--  </div>-->
</div>
</template>

<script>
import SideBarLong from "@/components/navigations/side-bar/large/sidebar-large";
// import SidebarSmall from "@/components/navigations/side-bar/small/sidebar-small";
export default {
name: "sidebar-index",
  components: { SideBarLong},
}
</script>

<style scoped>
.sidebar-panel{
  position: sticky;
  top:0;
  z-index: 1;
}
</style>