<template>
<div>
  <div class="d-none d-lg-block ">
    <side-bar-long />

  </div >

  <div class="">
    <sidebar-small />
  </div>
</div>
</template>

<script>
import SideBarLong from "@/components/navigations/side-bar/large/sidebar-large";
import SidebarSmall from "@/components/navigations/side-bar/small/sidebar-small";
export default {
name: "sidebar-index",
  components: {SidebarSmall, SideBarLong},
}
</script>

<style scoped>

</style>