<template>
  <div
       class="input-catalog form-control d-flex justify-content-between"

  >
    <div>
      <slot></slot>

    </div>
    <div>

      <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" @click="openedModal(modalId, id)"></i>

      <component
          v-if="items"
          :is="typeCatalog"
          v-bind="{ id: id, items: items, modalId: modalId,  multiMode: multiMode,}"
      />

    </div>
  </div>
</template>

<script>

import singleSelect from '@/components/catalog/catalog-input-single-selector/catalog-single-select'
import multiSelectTree from '@/components/catalog/catalog-input-multi-tree-selector/catalog-tree-multi-select'


export default {
  name: "input-catalog",
  components: {

    singleSelect,
    multiSelectTree,
  },
  props: {
    id: {
      type: String,
      required: true,
    },

    typeCatalog: {
      type: String,
      required: true,
    },
    items: {
      type: Array
    },

    modalId: {
      type: String,
      required: true,
    },

    multiMode: {
      type: String
    }


  },

  computed: {

  },

  data(){
    return{

    }
  },

  methods: {
    openedModal(modalId, InputId){

      this.typeCatalog === 'singleSelect' ?  this.$bvModal.show(modalId) : null ;
      this.typeCatalog === 'multiSelectTree' ?  this.$bvModal.show(modalId) : null ;

      /// что бы не кидать пропс потом в рекрсию, просто запишем ид инпута хранилище
      this.$store.commit('TempDataCatalog/setIdInput', InputId)



    },
  },

}
</script>

<style scoped>

.input-catalog.form-control {
  height: auto !important;
  /*background-color: #e9ecef;*/
}

i {
  cursor: pointer;
  color: #007bff;
  opacity: 0.6;
}

i:hover {
  opacity: 1;
}

</style>