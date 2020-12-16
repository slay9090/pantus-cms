<template>

  <div v-b-modal="modalId" >
  <slot name="btn" ></slot>
    <modal
        v-if="images"
        :id="id"
        :modal-id="modalId"

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





  mounted() {
      this.$store.commit('NewFileManager/setDataCurrentFiles', {key: this.id, value: this.images.slice()})
      this.$store.commit('NewFileManager/setDataSelectedFiles', {key: this.id, value: this.images.slice()})

  }


}
</script>

<style scoped>

</style>