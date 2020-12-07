<template>
  <div>

    <div class="card shadow" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Запчасти</small></h4>
      <div class="card-body">



            <filters />

<!--       <span v-if="dataTable">{{dataTable}}</span>-->

            <b-overlay :show="!dataTable" no-fade rounded="sm">
            <dynamics-table
                v-if="dataTable"
                id="table-products-parts-list"
            />
            </b-overlay>
        <hr>
            <b-pagination-nav
                v-if="dataTable"
                :link-gen="linkGen"
                :number-of-pages="(countItems/perPage)+1"
                use-router
                v-model="currentPage"
            ></b-pagination-nav>



          </div>

      </div>
    </div>
<!--  </div>-->
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
      perPage: 20,
      //currentPage: 1
    }
  },

  methods:{
    linkGen(pageNum) {
      // генерация ссылок Page
      let page;
      pageNum === 1 ? page = undefined : page = pageNum
      return {
        query: {
          ...this.$route.query,
          page_number: page,
        },
      };
    },


  },
  computed: {

    currentPage(){ return  this.$route.query.page_number ?  this.$route.query.page_number :  1 },

    dataTable() {  return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list'); },
    itemsProductParts() { return this.$store.getters["ProductParts/getDataItemsPartsByFilter"]; },

    countItems() {
      if (this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list')) {
        return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list').meta.count;
      }
      else {return 0}
    }

  },
  async mounted() {


    await this.$store.dispatch('ProductParts/dataItemsPartsByFilterNoConvertUrl', this.$route.query)
    this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': this.itemsProductParts})


  },
  // исправить
  watch: {
    async $route() {
      /// http://api.pantus.ru/products_filter?filter_brands=270&filter_categories=265,266&ilter_applicabilities=3138,3140
      console.log('change ')
      this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': null})
      await this.$store.dispatch('ProductParts/dataItemsPartsByFilterNoConvertUrl', this.$route.query)

      this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': this.itemsProductParts})
      //скролл на верх при переходе по пагинации
      window.scrollTo(0,0)
    }
  },


}
</script>

<style scoped>

</style>
