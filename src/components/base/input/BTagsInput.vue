<template>
  <ValidationProvider :name="$attrs.name" >
    <b-form-group
        v-bind="$attrs"
    >
                      <vue-tags-input
                          v-bind="$attrs"
                          class="tags-input"
                          v-model="innerValue"
                          @tags-changed="newTags => innerTags = newTags"
                          :tags="innerTags"

                      />
    </b-form-group>
  </ValidationProvider>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
name: "BTagsInput",
  components: {VueTagsInput},
  props: {
    value: {
      type: null
    },
    items: {
      type: null
    },
  },

  data: () => ({
    innerValue: '',
    innerTags: [],
  }),

  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },

    innerTags(newVal){
      this.$emit('update:items', newVal);
    },




  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
    if (this.items) {
      this.innerTags = this.items.map(elem => {
       return { "text": elem, "tiClasses": [ "ti-valid" ] }
      });
    }
  }
}
</script>

<style scoped>
.tags-input{
  max-width: 100% !important;
}

</style>