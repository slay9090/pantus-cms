<template>
  <div>

    <div class="card shadow" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Запчасти</small></h4>
      <div class="card-body">

          <div>

            <filters />

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


import DynamicsTable from "@/components/products/list/data-table";
import Filters from "@/components/products/list/filters-table";
export default {
name: "ProductsList",
  components: {Filters, DynamicsTable},
  props: ["query"],
  data() {
    return {

    }
  },

  methods:{



  },
  computed: {



    dataTable() {  return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list'); },

    itemsProductParts() { return this.$store.getters["ProductParts/getDataItemsPartsByFilter"]; },



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
