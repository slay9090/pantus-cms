<template>
  <div class="d-flex card col-4 p-0 ml-5 shadow">
    <h4 class="card-header"><small class="text-muted">Изображение в заголовке</small></h4>
    <div class="card-body">

      <b-form-group id="input-group-title-images" label="Image:" :label-for="id">
        <image-carousel
            :id="id"
            :modal-id="modalId"
        />
      </b-form-group>

    </div>
  </div>
</template>

<script>
import ImageCarousel from "@/components/image-carousel";

export default {
  name: "title-images",
  components: {ImageCarousel},
  props: {
    id: {
      type: String,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },
    images: {
      type: Array
    },
  },
}
</script>

<style scoped>

</style>