<template>
  <b-form-input
      v-model="valueInputText"
      type="tel"

      :placeholder="placeholder"
  >

  </b-form-input>
</template>

<script>
export default {
name: "phone-input",

  props: {

    id: {
      type: String,
      required: true,
    },

    // size: {
    //   validator(value) {
    //     return ['', 'sm', 'lg'].indexOf(value) !== -1
    //   },
    //   default: '',
    // },

    placeholder: {
      type: String,
      default: '89379999999',
    },

  },
  computed: {
    valueInputText: {
      get() {
        return this.$store.getters["BaseComponents/getValueInputPhone"](this.id)
      },
      set(val) {
        //запустить валидацию
        this.$store.commit('BaseComponents/setValueInputPhone', {key: this.id, value: val})
        //  val === 'q' ? this.isValid=false : this.isValid=null
      },

    }
  }
}
</script>

<style scoped>

</style>