<template>
  <div class="price-input ">
    <ValidationProvider name="Сумма" :rules="{double: true, required: true,}" v-slot="{ errors }">
  <b-form-input
      v-model="valueInputText"
      type="text"
      :size="size"
      :placeholder="placeholder"
      :state="!!errors[0] ? false : null"
      :aria-describedby="id+'-feedback'"
      required
  >
  </b-form-input>

    <b-form-invalid-feedback :id="id+'-feedback'" class="mb-3">
      {{errors[0]}}
    </b-form-invalid-feedback>
<!--      <span class="text-fail-validations">{{errors[0]}}</span>-->
    </ValidationProvider>

  </div>
</template>

<script>
export default {
  name: "price-input",

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
      default: '99.99',
    },

  },

  data(){
    return{
    }
  },

  computed: {
    valueInputText: {
      get() {
        return this.$store.getters["BaseComponents/getValueInputPrice"](this.id)
      },
      set(val) {
        //запустить валидацию

        this.$store.commit('BaseComponents/setValueInputPrice', {key: this.id, value: val})

      },

    }
  },



}
</script>

<style scoped>
  .text-fail-validations{
    display: block;
    margin-bottom: 1rem;
  }
</style>