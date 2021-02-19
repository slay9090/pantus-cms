<template>
  <ValidationProvider :vid="vid" :name="$attrs.name" :rules="rules">
    <b-form-group
        slot-scope="{ valid, errors }"
        v-bind="$attrs"


    >
      <b-form-input

          v-model="displayValue"
          v-bind="$attrs"
          @blur="isInputActive = false"
          @focus="isInputActive = true"
          :state="errors[0] ? false : (valid ? null : null)"
      >
      </b-form-input>
      <b-form-invalid-feedback id="inputLiveFeedback">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
export default {
name: "BCurrencyInput",
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
    },

  },
  data: () => ({
    innerValue: '',
    isInputActive: false

  }),

  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          // Cursor is inside the input field. unformat display value for user
          return this.value.toString()
        } else {
          // User is not modifying now. Format display value for user interface
          return "₽ " + this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\\.]/g, ""))
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue)
      }
    }
  },

  // watch: {
  //   // Handles internal model changes.
  //   innerValue(newVal) {
  //     this.$emit('input', newVal);
  //   },
  //   // Handles external model changes.
  //   value(newVal) {
  //     this.innerValue = newVal;
  //   }
  // },
  // created() {
  //   if (this.value) {
  //     this.innerValue = this.value;
  //   }
  // }
}
</script>

<style scoped>

</style>