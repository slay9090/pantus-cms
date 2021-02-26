<template>

  <b-form-group
      v-bind="$attrs"
  >

  <b-input-group  v-bind="$attrs"  >

    <b-form-input
        v-bind="$attrs"
        v-model="innerValue"
    ></b-form-input>

    <b-input-group-append>
      <slot :open="callModal"></slot>
    </b-input-group-append>


    <modal-box

        v-bind:modalshow.sync="showModal"
        v-model="innerValue"
        :items="items"
        scrollable
    ></modal-box>

  </b-input-group>

  </b-form-group>
</template>

<script>
import ModalBox from "@/components/check-box/modal-box";
export default {
name: "check-box",
  components: {ModalBox},
  props:{
    value: {
      type: null
    },
    items: {},
  },
  methods: {
    callModal(){
      console.log('xxx')
      this.showModal = true
    }
  },
  data: () => ({
    innerValue: '',
    showModal: false
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  created() {

    if (this.value) {
      this.innerValue = this.value;
    }
  }
}
</script>

<style scoped>

</style>