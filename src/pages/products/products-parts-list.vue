<template>
  <div>

    <div class="card shadow" id="tbl" >

      <h4 class="card-header">
        <b-row class="my-0 mx-0" align-h="between">
          <b-col cols="3" class="px-0">
        <small class="text-muted">Запчасти</small>
          </b-col>
          <b-col cols="5" class="text-right px-0">
        <b-icon-x-circle-fill
            variant="danger"
            class="btnn btnn-white btnn-animated rounded-circle h3 mb-0"
        />
        <b-icon-plus-circle-fill
            @click="addForm()"
            class="btnn btnn-white btnn-animated rounded-circle h3 mb-0 ml-2 "
            variant="success"
        >
        </b-icon-plus-circle-fill>
          </b-col>
          </b-row >
      </h4>


      <div class="card-body">



            <filters />

<!--       <span v-if="dataTable">{{dataTable}}</span>-->

            <b-overlay :show="!dataTable" no-fade rounded="sm" >
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
                first-number
                last-number
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
.btnn {
  cursor: pointer;
}

.btnn:link,
.btnn:visited {
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 40px;
  display: inline-block;
  border-radius: 100px;
  transition: all .2s;
  position: absolute;
}

.btnn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btnn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btnn-white {
  background-color: #fff;
  color: #777;
}

.btnn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all .4s;
}

.btnn-white::after {
  background-color: #fff;
}

.btnn:hover::after {
  transform: scaleX(1.2) scaleY(1.3);
  opacity: 0;
}

.btnn-animated {
  animation: moveInBottom 5s ease-out;
  animation-fill-mode: backwards;
}
</style>
