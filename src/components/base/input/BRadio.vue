<template>
  <ValidationProvider :vid="vid" :name="$attrs.name" :rules="rules">
    <b-form-group v-bind="$attrs" slot-scope="{ valid, errors, ariaDescribedby }" >
      <b-form-radio-group :state="errors[0] ? false : (valid ? null : null)" v-model="innerValue" :aria-describedby="ariaDescribedby" class="h-100 d-flex align-items-center">

        <slot />

      </b-form-radio-group>
      <b-form-invalid-feedback id="inputLiveFeedback">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
export default {
name: "BRadio",
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    // must be included in props
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: null
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
    this.innerValue = this.value;
  }
}
</script>

<style scoped>

</style>