<template>
  <div>

    <div class="card shadow" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Список продукции</small></h4>
      <div class="card-body">

          <div>
            <div class="py-3 d-flex  align-items-center">
              <div class="flex-grow-1 d-flex">
                <input-search
                id="input-search-products-parts"
                />
                <b-button class="ml-3 py-1"
                          :disabled="!valueSearchInput"
                          @click="$_inputCleaned(inputType.search,'input-search-products-parts')"
                >Clear
                </b-button>

                <b-button @click="getItemsPartsByFilter">Найти</b-button>


              </div>
              <div class="p-2 px-1">
<!--                <b-button variant="outline-danger" class="py-1 mx-2" :disabled="selected.length === 0">Удалить</b-button>-->
                <b-button variant="outline-success" class="py-1 ">Создать</b-button>
              </div>

            </div>
            <b-overlay :show="!dataTable" no-fade rounded="sm">
            <dynamics-table
                v-if="dataTable"
                id="table-products-parts-list"
            />
            </b-overlay>


          </div>
      </div>
    </div>
  </div>
</template>

<script>

import baseComponentsMixin from '@/mixins/base-components/inputs'

import DynamicsTable from "@/components/products/list/data-table";
export default {
name: "ProductsList",
  components: {DynamicsTable},

  mixins: [baseComponentsMixin],


  props: ["query"],

  data() {
    return {

    }
  },

  methods:{

    async getItemsPartsByFilter(){
      this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': null})
      await this.$store.dispatch('ProductParts/dataItemsPartsByFilter', {substr: this.valueSearchInput,})
      console.log(this.$store.getters["ProductParts/getDataItemsPartsByFilter"])
      this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': this.itemsProductParts})
    }

  },
  computed: {



    valueSearchInput() {
      return this.$store.getters["BaseComponents/getValueInputSearch"]('input-search-products-parts');
    },

    dataTable() {
      console.log('dataTable', this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list'))
      return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list')
    },

    itemsProductParts() {
      return this.$store.getters["ProductParts/getDataItemsPartsByFilter"]
    },



  },
  async mounted() {
    await this.$store.dispatch('ProductParts/dataItemsPartsByFilter', {substr: '',})
    this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': this.itemsProductParts})

  },
  // исправить
  watch: {
    $route() {
      //скролл на верх при переходе по пагинации
      window.scrollTo(0,0)
    }
  },


}
</script>

<style scoped>

</style>
