<template>
  <div class="price-input ">
    <ValidationProvider name="Сумма" :rules="{double: true, required: required,}" v-slot="{ errors }">

      <b-form-input
          v-model="valueData"
          v-on="$listeners"
          type="text"
          :placeholder="placeholder"
          :state="!!errors[0] ? false : null"
          :aria-describedby="id+'-feedback'"

      >
      </b-form-input>

      <b-form-invalid-feedback :id="id+'-feedback'" class="mb-3">
        {{ errors[0] }}
      </b-form-invalid-feedback>

    </ValidationProvider>

  </div>
</template>

<script>
export default {
  name: "price-input",

  props: {
    id: {
      type: String,
      default: 'price-input'
    },
    placeholder: {
      type: String,
      default: '99.99',
    },
    value: {},
    required: {
      type: Boolean,
      default: false
    },

  },

  computed: {
    valueData: {
      get() {
        return this.value
      },
      set(val) {
        // some logic
        this.$emit('update:value', val)
      },
    }
  }

}
</script>

<style scoped>

</style>