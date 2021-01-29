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

        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dicta dolor enim explicabo facilis illo illum ipsum libero magni maxime obcaecati odio, officiis perspiciatis, quam quasi quis ratione, reiciendis totam.
        </b-card-text>

      </b-card>

    </b-col>


    <b-col >
      <b-card header-tag="header">
        <template #header>
          <h4><small class="text-muted">Позиции</small></h4>
        </template>
        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dicta dolor enim explicabo facilis illo illum ipsum libero magni maxime obcaecati odio, officiis perspiciatis, quam quasi quis ratione, reiciendis totam.
        </b-card-text>
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