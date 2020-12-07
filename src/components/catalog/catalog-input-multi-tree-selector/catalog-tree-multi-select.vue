<template>

  <div >
    <b-modal
        @hidden="handleResetTempData"
        :id="modalId"
        title="Дерево Каталога"
        size="lg"
        centered no-fade no-close-on-backdrop no-close-on-esc
        ok-title="Сохранить">
      <div class="scrollblock">

        <template v-if="multiMode === 'all-node'">
        <allNode :id="id" v-for="item in items" :node="item" :key="item.id"
        />
        </template>

        <template v-if="multiMode === 'only-last-node'">
          <onlyLastNode :id="id" v-for="item in items" :node="item" :key="item.id"
          />
        </template>

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

import onlyLastNode from "./only-last-node/only-last-node";
import allNode from "./all-nodes/all-node";

export default {
  name: "checkBoxForm",
  components: {
    onlyLastNode,
    allNode,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    items: Array,

    modalId: {
      type: String,
      required: true,
    },
    multiMode: {
      type: String,
      required: true,
    },

  },

  data() {
    return {

    }
  },

  computed: {

  },
  methods: {

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()

    //  console.log('TEST', this.id, this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id), this.items)

      // НАЧАЛО ПУТЬ ид узлов до конечного выбранного логика во вьюксе
      this.$store.dispatch('TempDataCatalog/addPathTreeForThisNode',
          {
            'key': this.id,
            'value': this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id),
            'items': this.items,
          }
      )


      this.$store.commit('TempDataCatalog/setValueInputCatalog', {
        'key': this.id,
        'value': this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id)
      })

      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId)
      })
    },

    handleCancel(bvModalEvt) {
      bvModalEvt.preventDefault()


      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId)

      })

    },

    handleResetTempData(){
      this.resetTempData();
    },

    // Сброс временного состояния и запись в него то, что находится в getValueInputCatalog
   resetTempData() {
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

    this.$store.dispatch('TempDataCatalog/addPathTreeForThisNode',
        {
          'key': this.id,
          'value': this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id),
          'items': this.items,
        }
    )


    //это что бы прокинуть алл айтемс фильтров в рекурсию !!!
    this.$store.commit('TempDataCatalog/setDataTempItemsForCurrentFilter', {
      'key': this.id,
      'value': this.items
    })

  },



}
</script>

<style scoped>
.scrollblock {
  height: 500px;
  width: 100%;
  overflow-y: auto;
}

</style>
