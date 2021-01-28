<template>

<b-container fluid>

  form
  {{$route.params}}

  <b-row>

    <b-col >

      <b-card header-tag="header">
        <template #header>
          <h4><small class="text-muted">Заказ</small></h4>
        </template>

      </b-card>

    </b-col>


    <b-col >
      <b-card header-tag="header">
        <template #header>
          <h4><small class="text-muted">Позиции</small></h4>
        </template>

      </b-card>
    </b-col>

  </b-row>

</b-container>

</template>

<script>
export default {
name: "index"
}
</script>

<style scoped>

</style>