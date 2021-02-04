<template>
  <b-form-input
      v-model="valueInputText"
      type="text"
      :size="size"
      :placeholder="placeholder"
  >

  </b-form-input>
</template>

<script>
export default {
  name: "text-input",
  props: {

    id: {
      type: String,
      required: true,
    },

    size: {
      validator(value) {
        return ['', 'sm', 'lg'].indexOf(value) !== -1
      },
      default: '',
    },

    placeholder: {
      type: String,
      default: 'Текст',
    },

  },
  computed: {
    valueInputText: {
      get() {
        return this.$store.getters["BaseComponents/getValueInputText"](this.id)
      },
      set(val) {
        //запустить валидацию
        this.$store.commit('BaseComponents/setValueInputText', {'key': this.id, 'value': val})
        //  val === 'q' ? this.isValid=false : this.isValid=null
      },

    }
  }

}
</script>

<style scoped>

</style>