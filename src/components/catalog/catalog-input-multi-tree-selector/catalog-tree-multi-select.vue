<template>

  <div >
    <b-modal
        @hidden="handleResetTempData"
        :id="modalId"
        :title="titleName"
        size="lg"
        centered no-fade no-close-on-backdrop no-close-on-esc
        ok-title="Сохранить">


      <search-input
          v-if="items.length>0"
      :id="inputSearchId"
      placeholder="Поиск"
      @input="filteredData"
      debounce="0"
      />

      <div class="scrollblock">

        <template v-if="multiMode === 'all-node'">
        <allNode :id="id" v-for="(item, index) in items" :node="item" :key="index"
        />
        </template>

        <template v-if="multiMode === 'only-last-node' &&  items.length>0">
          <onlyLastNode :id="id" v-for="(item, index) in items" :node="item" :key="index"
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
import SearchInput from "@/components/base/input/search-input";
import {TreeConverter} from "@/mixins/service/tree/union-tree";

export default {
  name: "checkBoxForm",
  // mixins: {
  //   UnionTree
  // },
  components: {
    SearchInput,
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
    titleName: {
      type: String,
      default: 'Каталог'
    },

  },

  data() {
    return {
      inputSearchId: 'catalog-tree-select',
      filterData: [],
      treeUnion: new TreeConverter(),
     // unionTree: new unionTree()
    }
  },

  computed: {
    valueSearchInput() {
      return this.$store.getters["BaseComponents/getValueInputSearch"](this.inputSearchId);
    },
  },
  methods: {


    filteredData(){
      if (this.valueSearchInput!=='') {
        this.filterData = []
        this.items.forEach(elem => {
          this.searchItems([elem], [elem], [], 0)
        })
      //  this.unionTree(this.filterData).getTree();

      //  this.treeUnion.getTree(this.filterData);


       // this.filterData = this.treeUnion.getTree(this.filterData)

     //  console.log(this.filterData)

      }
      else {
        this.filterData = this.items
      }
    },


    searchItems(elem, parent, path, count){

      elem.forEach(item => {

        if(item.name) {
          /// Система вентиляции картера
          if (item.name.toUpperCase().includes(this.valueSearchInput.toUpperCase())) {

            let arrayCopy = JSON.parse(JSON.stringify(parent));
            arrayCopy.push(JSON.parse(JSON.stringify(item)));

            this.getChildren(item.children).forEach(elem => {
              arrayCopy.push(JSON.parse(JSON.stringify(elem)));
            })

            this.setFindedTree(arrayCopy);

          }
        }
        if (item.children && item.children.length > 0){

          parent[count]=item

          return this.searchItems(item.children, parent, item, count+1)
        }
      })


    },

    setFindedTree(parentPath){

      console.log('parentPath', parentPath)

      this.filterData.push(parentPath)
    },

    getChildren(item){
      //console.log(item)
        return item.reduce(function(done,curr){
          return done.concat(curr);

          // eslint-disable-next-line no-unreachable
          if (item.children && item.children.length > 0) {
            return this.getChildren(curr.children);
          }
        }, []);

    },



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
 async resetTempData() {

     // console.log(this.id,'NOW IN INPUT', this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id))

      this.$store.commit('TempDataCatalog/clearDataItemsTempValue', {inputid: this.id})
     await this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.id).forEach(elem => {
        this.$store.commit('TempDataCatalog/addItemTempValue', {
          'key': this.id,
          'value': elem
        })
      })



    }
  },

  mounted() {

    this.resetTempData();

   // console.log('wait?', this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.id), this.items)

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
