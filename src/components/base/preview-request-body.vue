<template>
  <div class="d-flex card col-3 p-0 ml-5 shadow" id="treechild">
    <h4 class="card-header"><small class="text-muted">Формализованный запрос</small></h4>
    <div class="card-body">
      <pre class="m-0 m-0 overflow-auto heigh-json">{{ data }}</pre>
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
.heigh-json{
  max-height: 50em;
}
</style>