<template>
  <b-form-textarea
      v-model="valueInputText"
      type="text"
      :size="size"
      :placeholder="placeholder"
      :rows="rows"
      :max-rows="maxRows"
  >

  </b-form-textarea>
</template>

<script>
export default {
name: "text-area",

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

    rows: {
      type: Number,
      default: 1
    },
    maxRows: {
      type: Number,
      default: 3
    },
    minLength: {
      type: Number,
      default: 3,
    },
    maxLength: {
      type: Number,
      default: 0 // 0 - no limit
    },

  },
  computed: {
    valueInputText: {
      get() {
        return this.$store.getters["BaseComponents/getValueTextArea"](this.id)
      },
      set(val) {
        //запустить валидацию
        this.$store.commit('BaseComponents/setValueTextArea', {key: this.id, value: val})
        //  val === 'q' ? this.isValid=false : this.isValid=null
      },

    }
  }

}
</script>

<style scoped>

</style>