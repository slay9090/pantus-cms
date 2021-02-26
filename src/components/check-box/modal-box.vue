<template>
  <b-modal
      v-bind="$attrs"
      v-model="innerState"
      @ok="handleOk"
  >
    <b-form-group
        label="Выбор элементов"
    >
      <b-form-checkbox-group
          v-model="innerValue"
          :options="items"
          value-field="id"
          text-field="name"
          disabled-field="contains_description"
          stacked
      ></b-form-checkbox-group>
    </b-form-group>
  </b-modal>
</template>

<script>
export default {
  name: "modal-box",
  props: ['value', 'items', 'modalshow'],

  data(){
    return{
      innerValue: null,
      innerItems: []
    }
  },

  computed: {
    innerState: {
      get() {
        return this.modalshow;
      },
      set(val) {
        console.log(val)
        this.$emit('update:modalshow', val)
      }
    },
  },

  methods:{
    handleOk(bvModalEvt) {
      this.$emit('input', this.innerValue.toString())
    },
  },

  mounted() {
    if(this.value){
      this.innerValue = this.value.split(',')
      console.log('sel ',this.innerValue)
    }

  }

}
</script>

<style scoped>

</style>