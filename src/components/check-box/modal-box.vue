<template>
  <b-modal
      v-bind="$attrs"
      v-model="innerState"
      @ok="handleOk"
  >
    <b-form-group
        label="Выбор элементов"
    >

      <RecycleScroller
          class="scrollblock"
          :items="items"
          :item-size="30"
          key-field="id"
          v-slot="{ item }"
          content-tag="b-form-checkbox"
      >

          <b-form-checkbox
              class="scrollblock-items"
              v-model="innerValue"
              :value="item.id"
              :disabled="item.contains_description"
          >
            {{ item.name }}
          </b-form-checkbox>

      </RecycleScroller>

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
        // console.log(val)
        this.$emit('update:modalshow', val)
      }
    },
  },

  methods:{
    handleOk(bvModalEvt) {
      console.log(this.innerValue)
      this.$emit('input', this.innerValue)
    },
  },

  mounted() {
    if(this.value){
      this.innerValue = this.value

    }

  }

}
</script>

<style scoped>


.scrollblock {
  height: 500px;
  width: 100%;
}

.scrollblock-items{
  padding-left: 32px;
}
</style>