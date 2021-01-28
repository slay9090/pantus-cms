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


            <table-dynamic
                v-if="partsList"
                :table-id="identifierComponents.tables.partsList"
                :fields="fields"
                :items="partsList.data"
                :items-count="partsList.meta !== undefined ? parseInt(partsList.meta.count) : 0"
                :items-on-page="20"

            >


              <template v-slot:cell(name)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->
                <router-link :to="'/products/list/edit?id='+data.item.id"  class="mb-0 title-block__text-limit" >{{ data.value }} </router-link>
              </template>


              <template v-slot:cell(sku.origin)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->
                <span class="mb-0 title-block__text-limit" >{{ data.value }} </span>
              </template>


              <template v-slot:cell(images.main.url)="data">
                <img :src="data.value" width="50" height="30"/>
              </template>

              <template v-slot:cell(categories)="data">
                <span v-for="item in data.value" :key="item.id">{{item.name}}, </span>
              </template>

              <template v-slot:cell(applicabilities)="data">
                <span v-for="item in data.value" :key="item.id">{{item.name}}, </span>
              </template>


              <template #cell(offers)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                  {{ row.detailsShowing ? 'Hide' : 'Show'}} Offers
                </b-button>
              </template>

              <template #row-details="row">

                <b-card  v-for="item in row.item.offers" :key="item.id">
                  <b-row class="mb-0">
                    <b-col sm="3" class="text-sm-right"><b>Наименование:</b></b-col>
                    <b-col>{{ item.supplier.name }}</b-col>
                  </b-row>

                  <b-row class="mb-0">
                    <b-col sm="3" class="text-sm-right"><b>Цена:</b></b-col>
                    <b-col>{{ item.price }} руб.</b-col>
                  </b-row>

                  <b-row class="mb-0">
                    <b-col sm="3" class="text-sm-right"><b>Кол-во:</b></b-col>
                    <b-col>{{ item.quantity }} ед.</b-col>
                  </b-row>

                  <b-row class="mb-0">
                    <b-col sm="3" class="text-sm-right"><b>Дата:</b></b-col>
                    <b-col sm="3" class="text-sm-right ">
                      <b-row class="px-3">{{ item.dates.created }} (создан)</b-row>
                      <b-row class="px-3">{{ item.dates.modified }} (изменён)</b-row>
                    </b-col>
                  </b-row>

                  <b-row class="mb-0">
                    <b-col sm="3" class="text-sm-right"><b>Активен:</b></b-col>
                    <b-col>{{ item.activity ? 'Да' : 'Нет' }} </b-col>
                  </b-row>

                  <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </b-card>
              </template>

            </table-dynamic>


<!--       <span v-if="dataTable">{{dataTable}}</span>-->

<!--            <b-overlay :show="!dataTable" no-fade rounded="sm" >-->
<!--            <dynamics-table-->
<!--                v-if="dataTable"-->
<!--                id="table-products-parts-list"-->
<!--            />-->
<!--            </b-overlay>-->
<!--        <hr>-->
<!--            <b-pagination-nav-->
<!--                v-if="dataTable"-->
<!--                :link-gen="linkGen"-->
<!--                :number-of-pages="(countItems/perPage)+1"-->
<!--                use-router-->
<!--                first-number-->
<!--                last-number-->
<!--                v-model="currentPage"-->
<!--            ></b-pagination-nav>-->

          </div>

      </div>
    </div>
<!--  </div>-->
</template>

<script>


// import DynamicsTable from "@/components/products/list/data-table";
import Filters from "@/components/products/list/filters-table";
export default {
name: "ProductsList",
  components: {Filters, },
  props: ["query"],
  data() {
    return {
      perPage: 20,
      //currentPage: 1


      identifierComponents: {
        input: {},
        tables: {
          partsList: 'table-products-parts-list',
        }
      },

      fields: [
        { key: 'selected', label:  '✓',  thStyle: {  width: '30px' }},
        { key: 'id',  sortable: true , label: 'id',  },
        { key: 'name', sortable: true , label: 'Наименование', },
        { key: 'brand.name', label: 'Бренд'  , },
        { key: 'categories', label: 'Категория'  , },
        { key: 'applicabilities', label: 'Применяемость'  ,  },
        { key: 'sku.origin', label: 'Артикул'  , },
        { key: 'images.main.url', label: 'Изображение'  , },
        { key: 'offers', label: 'Оферы'  , thStyle: {  width: '130px' } },
        // { key: 'offers[0].dates.modified', sortable: true , label: 'Дата' , thStyle: {  width: '100px' }},
      ],

    }
  },

  methods:{
    // linkGen(pageNum) {
    //   // генерация ссылок Page
    //   let page;
    //   pageNum === 1 ? page = undefined : page = pageNum
    //   return {
    //     query: {
    //       ...this.$route.query,
    //       page_number: page,
    //     },
    //   };
    // },


  },
  computed: {

    partsList(){
      console.log(this.$store.getters["ProductParts/getDataItemsPartsByFilter"])
      return this.$store.getters["ProductParts/getDataItemsPartsByFilter"];
    },



    // currentPage(){ return  this.$route.query.page_number ?  this.$route.query.page_number :  1 },

    // dataTable() {  return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list'); },
    // itemsProductParts() { return this.$store.getters["ProductParts/getDataItemsPartsByFilter"]; },

    // countItems() {
    //   if (this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list')) {
    //     return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list').meta.count;
    //   }
    //   else {return 0}
    // }

  },
  async mounted() {

    await this.$store.dispatch('ProductParts/dataItemsPartsByFilter', this.$route.query)
    // this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': this.itemsProductParts})

  },
  // исправить
  watch: {
    // async $route() {
    //   /// http://api.pantus.ru/products_filter?filter_brands=270&filter_categories=265,266&ilter_applicabilities=3138,3140
    //
    //   this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': null})
    //   await this.$store.dispatch('ProductParts/dataItemsPartsByFilterNoConvertUrl', this.$route.query)
    //   this.$store.commit('TempDataTableDymamic/setDataTable', {'key': 'table-products-parts-list', 'value': this.itemsProductParts})
    //   //скролл на верх при переходе по пагинации
    //   window.scrollTo(0,0)
    // }

    $route() {

      this.$store.dispatch('ProductParts/dataItemsPartsByFilter', this.$route.query)
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
