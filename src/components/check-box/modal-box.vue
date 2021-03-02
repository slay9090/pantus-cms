<template>
  <b-modal
      v-bind="$attrs"
      v-model="innerState"
      @ok="handleOk"
      @show="handleClose"
      @hidden="handleClose"
  >
    <b-form-group


    >
      <BTextInput
        v-model="inputSearchText"
        placeholder="Введите название"
        type="text"
      />
      <RecycleScroller
          class="scrollblock"
          :items="filteredList()"
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
      inputSearchText: '',
    }
  },

  computed: {
    innerState: {
      get() {
        return this.modalshow;
      },
      set(val) {
        this.$emit('update:modalshow', val)
      }
    },
  },

  methods:{
    handleOk(bvModalEvt) {
      console.log(this.innerValue)
      this.$emit('input', this.innerValue)
    },

    handleClose(){
      this.inputSearchText = ''
    },

    filteredList() {
      if (this.items) {
        return this.items.filter(elem => {
          return elem.name.toLowerCase().includes(this.inputSearchText.toLowerCase())
        })
      }
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