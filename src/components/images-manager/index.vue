<template>

  <div v-b-modal="modalId" >
  <slot name="btn" ></slot>
    <modal
        :id="id"
        :modal-id="modalId"
        :images="images"
    />
  </div>


</template>

<script>
import Modal from "@/components/images-manager/modal";
export default {
name: "image-manager",
  components: {Modal},
  props: {
    id: {
      type: String,
      require: true,
    },
    modalId: {
      type: String,
      require: true,
    },
    images: {
      type: Array
    },
  },


}
</script>

<style scoped>

</style>