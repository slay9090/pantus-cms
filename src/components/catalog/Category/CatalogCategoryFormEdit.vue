<template>
<div>

  <h1>EDIT FORM CATEGORY</h1>
  <div>$route.query: {{$route.query}}</div>
  <div>query: {{query}}</div>

</div>
</template>

<script>
export default {
  props: ["query"],
  name: "CatalogCategoryFormEdit"
}
</script>

<style scoped>

</style>
