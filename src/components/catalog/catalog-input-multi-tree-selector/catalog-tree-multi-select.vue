<template>

  <div>
    <b-modal

        id="modal-input-catalog-multi-tree-select"
        title="Дерево Каталога"
        size="lg"
        centered no-fade no-close-on-backdrop no-close-on-esc
        ok-title="Сохранить">
      <div class="scrollblock">

        <checkboxtree v-for="item in items" :node="item" :key="item.id"
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
  },

  data() {
    return {}
  },

  computed: {


    tempItemsSelected() {
      return this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"]
    },


  },
  methods: {


    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()

      this.$store.commit('TempDataCatalog/setDataParentsSelectedNodes', this.getAllParentsForAllSelectedNodes(this.tempItemsSelected)) // сделать выч. свлв=-во
      this.$store.commit('TempDataCatalog/setValueInputCatalog', {
        'key': this.id,
        'value': this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"]
      })

      this.resetTempData();
      this.$nextTick(() => {
        this.$bvModal.hide('modal-input-catalog-multi-tree-select')
      })
    },

    handleCancel(bvModalEvt) {
      bvModalEvt.preventDefault()

      this.resetTempData();
      this.$nextTick(() => {
        this.$bvModal.hide('modal-input-catalog-multi-tree-select')
      })
    },


    ///НАЧАЛО ПОЛУЧАЕМ И ФОРМИРУЕМ ПУТЬ ДО ВЫБРАННЫХ УЗЛОВ
    getAllParentsForAllSelectedNodes(selectedCatalogFilter) {
      let parent = []
      selectedCatalogFilter.forEach(element => {
        parent.push(this.getAllParentForOneNode(this.items, element.id))
      })

      return parent
    },
    getAllParentForOneNode(dataset, nodeId) {
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
    async resetTempData() {
      await this.$store.dispatch('TempDataCatalog/loadTempValueInputCatalog', [])
      await this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id).forEach(elem => {
        this.$store.commit('TempDataCatalog/addItemTempValue', elem)
      })
    }
  },

  async mounted() {
    await this.resetTempData();
    await this.$store.commit('TempDataCatalog/setDataParentsSelectedNodes', this.getAllParentsForAllSelectedNodes(this.tempItemsSelected))
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
