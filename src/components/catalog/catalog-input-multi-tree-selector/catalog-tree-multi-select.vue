<template>

  <div >
    <b-modal

        :id="modalId"
        title="Дерево Каталога"
        size="lg"
        centered no-fade no-close-on-backdrop no-close-on-esc
        ok-title="Сохранить">
      <div class="scrollblock">

        <checkboxtree :id="id" v-for="item in items" :node="item" :key="item.id"
        ></checkboxtree>
      </div>

      <template v-slot:modal-footer>
        <div class="w-100">

          <b-button
              variant="primary"
              class="float-right "
              @click="handleOk"
          >
            Сохранить
          </b-button>
          <b-button
              variant=""
              class="float-right mx-3"
              @click="handleCancel"
          >
            Отмена
          </b-button>

        </div>
      </template>

    </b-modal>


  </div>

</template>

<script>

import checkboxtree from "./catalog-tree-multi-select-node"

export default {
  name: "checkBoxForm",
  components: {
    checkboxtree,
  },
  props: {
    id: {
      type: String,
    },
    items: Array,

    modalId: {
      type: String,
      required: true,
    }

  },

  data() {
    return {

    }
  },

  computed: {


    tempItemsSelected () {
      console.log('COMP', this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id))
      return this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id)
    },


  },
  methods: {


    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()


      // Список ид узлов до конечного выбранного, что бы раскрыть нужные ветки.
      this.$store.dispatch('TempDataCatalog/loadParentsSelectedNodes',
          {
            'key': this.id,
            'value': this.getAllParentsForAllSelectedNodes(this.tempItemsSelected)}
      )

      console.log('TEMP NA ZAPIC ', this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id))



      this.$store.commit('TempDataCatalog/setValueInputCatalog', {
        'key': this.id,
        'value': this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id)
      })

      console.log('ZAPICAL', this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id))

    //  this.resetTempData();

      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId)
      })
    },

    handleCancel(bvModalEvt) {
      bvModalEvt.preventDefault()

     // this.resetTempData();
      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId)

      })

    },


    ///НАЧАЛО ПОЛУЧАЕМ И ФОРМИРУЕМ ПУТЬ ДО ВЫБРАННЫХ УЗЛОВ
     getAllParentsForAllSelectedNodes(selectedCatalogFilter) {
      console.log('selectedCatalogFilter', selectedCatalogFilter)
      let parent = []
       selectedCatalogFilter.forEach(element => {
        parent.push(this.getAllParentForOneNode(this.items, element.id))
      })

      return parent
    },
    getAllParentForOneNode(dataset, nodeId) {
      console.log('dataset', dataset, 'nodeId', nodeId)
      let parents = []
      var TreeModel = require('tree-model'),
          tree = new TreeModel();
       dataset.forEach(element => {
        let rootMain = tree.parse(element);
        rootMain.walk(function (node) {
          if (node.model.id === nodeId) {
            let x = node.getPath()
            x.forEach(element => {
              parents.push(element.model.id)

            })
          }
        })
      })

      return parents
    },

    ///КОНЕЦ ПОЛУЧАЕМ И ФОРМИРУЕМ ПУТЬ ДО ВЫБРАННЫХ УЗЛОВ
    // Сброс временного состояния и запись в него то, что находится в getValueInputCatalog
   resetTempData() {
      // this.$store.dispatch('TempDataCatalog/loadTempValueInputCatalog', [])
     console.log(this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id))

      this.$store.commit('TempDataCatalog/clearDataItemsTempValue', {inputid: this.id})

      this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id).forEach(elem => {
        this.$store.commit('TempDataCatalog/addItemTempValue', {
          'key': this.id,
          'value': elem
        })
      })
    }
  },

  mounted() {


    this.resetTempData();

    // Список ид узлов до конечного выбранного, что бы раскрыть нужные ветки.
    if (this.items) {
      this.$store.dispatch('TempDataCatalog/loadParentsSelectedNodes',
          {
            'key': this.id,
            'value': this.getAllParentsForAllSelectedNodes(this.tempItemsSelected)
          }
      )
    }

  },


}
</script>

<style scoped>
.scrollblock {
  height: 500px;
  width: 100%;
  overflow-y: auto;
}

.scroller {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
</style>
