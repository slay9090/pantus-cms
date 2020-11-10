<template>
  <div class="d-flex card col-4 p-0 " id="treechild">
    <h4 class="card-header"><small class="text-muted">Формализованный запрос</small></h4>
    <div class="card-body">
      <pre class="m-0">{{ data }}</pre>
    </div>
  </div>
</template>

<script>
export default {
name: "preview-request-body",
  props: {
  data: {
    type: Object, Array,

  }
  },
}
</script>

<style scoped>

</style>