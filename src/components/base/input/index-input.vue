<template>
  <b-form-input
      v-model="valueInputIndex"
      :size="size"
      type="number"
      :placeholder="placeholder"
      :state="isValid"
      required
  >

  </b-form-input>
</template>

<script>
export default {
  name: "index-input",

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
      default: 'Id',
    },

  },

  data(){
    return{
      isValid: null,
    }
  },

  computed: {

    valueInputIndex: {
      get() {

        return this.$store.getters["BaseComponents/getValueInputIndex"](this.id)
      },
      set(val) {
        //запустить валидацию

       // this.valid(val)

        this.$store.commit('BaseComponents/setValueInputIndex', {'key': this.id, 'value': val})
        val === 'q' ? this.isValid = false : this.isValid = null

      },

    }

  },
  methods: {
    // valid(val) {
    //   console.log('VALIDA ', val)
    // }
  },


}
</script>

<style scoped>

</style>