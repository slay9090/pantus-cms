<template>
  <div>



    <div class="card shadow" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Список продукции</small></h4>
      <div class="card-body">

          <div>
            <div class="py-3 d-flex  align-items-center">
              <div class="flex-grow-1 d-flex">
<!--                <b-form-input size="sm" class="col-3 py-3"-->
<!--                              v-model="filter"-->
<!--                              type="search"-->
<!--                              id="filterInput"-->
<!--                              placeholder="Type to Search"-->
<!--                ></b-form-input>-->
<!--                <b-button class="ml-3 py-1" :disabled="!filter" @click="filter = ''">Clear</b-button>-->

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

<!--            <b-overlay :show="spinerLoaderIsShow" no-fade rounded="sm">-->
<!--              <b-table-->
<!--                  ref="selectableTable"-->
<!--                  selectable-->
<!--                  select-mode="single"-->
<!--                  selected-variant="warning"-->
<!--                  @row-selected="onRowSelected"-->
<!--                  id="my-table"-->
<!--                  :items="productsJson"-->
<!--                  :fields="fields"-->

<!--                  sort-icon-left-->
<!--                  responsive="sm"-->
<!--                  :per-page="perPage"-->
<!--                  :current-page="currentPage"-->
<!--                  :filter="filter"-->
<!--                  head-variant="light"-->
<!--                  small-->
<!--              >-->

<!--                <template v-slot:cell(selected)="{ rowSelected }">-->
<!--                  <template  v-if="rowSelected">-->
<!--                    <span  aria-hidden="true">&check;</span>-->

<!--                  </template>-->
<!--                  <template  v-else>-->
<!--                    <span  aria-hidden="true">&nbsp;</span>-->

<!--                  </template>-->
<!--                </template>-->


<!--                <template v-slot:cell(name)="data">-->
<!--                  &lt;!&ndash; `data.value` is the value after formatted by the Formatter &ndash;&gt;-->
<!--                  <router-link :to="'/products/list/edit?id='+data.item.id"  class="mb-0 title-block__text-limit" >{{ data.value }} </router-link>-->
<!--                </template>-->


<!--                <template v-slot:cell(sku.origin)="data">-->
<!--                  &lt;!&ndash; `data.value` is the value after formatted by the Formatter &ndash;&gt;-->
<!--                  <span class="mb-0 title-block__text-limit" >{{ data.value }} </span>-->
<!--                </template>-->


<!--                <template v-slot:cell(images.main.url)="data">-->
<!--                  <img :src="data.value" width="50" height="30"/>-->
<!--                </template>-->

<!--                <template v-slot:cell(categories)="data">-->
<!--                  <span v-for="item in data.value" :key="item.id">{{item.name}}, </span>-->
<!--                </template>-->

<!--                <template v-slot:cell(applicabilities)="data">-->
<!--                  <span v-for="item in data.value" :key="item.id">{{item.name}}, </span>-->
<!--                </template>-->


<!--                <template #cell(offers)="row">-->
<!--                  <b-button size="sm" @click="row.toggleDetails" class="mr-2">-->
<!--                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Offers-->
<!--                  </b-button>-->
<!--                </template>-->

<!--                <template #row-details="row">-->

<!--                  <b-card  v-for="item in row.item.offers" :key="item.id">-->
<!--                    <b-row class="mb-0">-->
<!--                      <b-col sm="3" class="text-sm-right"><b>Наименование:</b></b-col>-->
<!--                      <b-col>{{ item.supplier.name }}</b-col>-->
<!--                    </b-row>-->

<!--                    <b-row class="mb-0">-->
<!--                      <b-col sm="3" class="text-sm-right"><b>Цена:</b></b-col>-->
<!--                      <b-col>{{ item.price }} руб.</b-col>-->
<!--                    </b-row>-->

<!--                    <b-row class="mb-0">-->
<!--                      <b-col sm="3" class="text-sm-right"><b>Кол-во:</b></b-col>-->
<!--                      <b-col>{{ item.quantity }} ед.</b-col>-->
<!--                    </b-row>-->

<!--                    <b-row class="mb-0">-->
<!--                      <b-col sm="3" class="text-sm-right"><b>Дата:</b></b-col>-->
<!--                      <b-col sm="3" class="text-sm-right ">-->
<!--                        <b-row class="px-3">{{ item.dates.created }} (создан)</b-row>-->
<!--                        <b-row class="px-3">{{ item.dates.modified }} (изменён)</b-row>-->
<!--                      </b-col>-->
<!--                    </b-row>-->

<!--                    <b-row class="mb-0">-->
<!--                      <b-col sm="3" class="text-sm-right"><b>Активен:</b></b-col>-->
<!--                      <b-col>{{ item.activity ? 'Да' : 'Нет' }} </b-col>-->
<!--                    </b-row>-->

<!--                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>-->
<!--                  </b-card>-->
<!--                </template>-->

<!--              </b-table>-->
<!--            </b-overlay>-->
<!--            <b-pagination-nav-->
<!--                :link-gen="linkGen"-->
<!--                :number-of-pages="(rows/perPage)+1"-->
<!--                use-router-->
<!--                v-model="currentPage"-->
<!--            ></b-pagination-nav>-->


<!--            <p class="mt-3">Current Page: {{ currentPage }}</p>-->

<!--            <dynamics-table-->

<!--                id="products-parts-list"-->

<!--            />-->



          </div>
<!--          <div>-->
<!--            <p>-->
<!--              Selected Rows:<br>-->
<!--              {{ selected }}-->
<!--            </p>-->
<!--          </div>-->

      </div>
    </div>
  </div>
</template>

<script>

import baseComponentsMixin from '@/mixins/base-components/inputs'

//import DynamicsTable from "@/components/products/dynamics-table";
export default {
name: "ProductsList",
//  components: {DynamicsTable},

  mixins: [baseComponentsMixin],


  props: ["query"],

  data() {
    return {
      //
      // perPage: 20, // кол-во строк в пагинации
      // currentPage: this.query,
      // sortBy: 'id',
      // sortDesc: false,
      // filter: null,
      // selected: [],
      // fields: [
      //   { key: 'selected', label:  '✓',  thStyle: {  width: '30px' }},
      //   { key: 'id',  sortable: true , label: 'id',  },
      //   { key: 'name', sortable: true , label: 'Наименование', },
      //   { key: 'brand.name', label: 'Бренд'  , },
      //   { key: 'categories', label: 'Категория'  , },
      //   { key: 'applicabilities', label: 'Применимости'  ,  },
      //   { key: 'sku.origin', label: 'Артикул'  , },
      //   { key: 'images.main.url', label: 'Изображение'  , },
      //   { key: 'offers', label: 'Оферы'  , thStyle: {  width: '130px' } },
      //   // { key: 'offers[0].dates.modified', sortable: true , label: 'Дата' , thStyle: {  width: '100px' }},
      // ],
      // show: true,
      // spinerLoaderIsShow: true,
      //
      //
      // productsJson:[],



    }
  },
  methods:{


    async getItemsPartsByFilter(){
      await this.$store.dispatch('ProductParts/dataItemsPartsByFilter', {substr: this.valueSearchInput,})
      console.log(this.$store.getters["ProductParts/getDataItemsPartsByFilter"])
    }

    // ///записать данные выбраной строки в таблице
    // onRowSelected(items) {
    //   this.selected = items
    // },
    //
    // /**
    //  * xxxxx
    //  * @param pageNum sdfgsfdgdfg
    //  * @returns {string|string}
    //  */
    // linkGen(pageNum){
    //   return pageNum === 1 ? '?' : `?page=${pageNum}`
    // },
    // //сортировка по дате

  },
  computed: {



    valueSearchInput() {
      return this.$store.getters["BaseComponents/getValueInputSearch"]('input-search-products-parts');
    },


    //кол-во строк в таблице
    // rows() {
    //
    //   return this.productsJson.length
    //
    // }

  },
  async mounted() {
    this.$store.commit("")

    this.spinerLoaderIsShow= false
    // await this.$store.dispatch("ProductParts/dataDetailPartsById", '109478,55171,55213');
    // this.productsJson = await this.$store.getters["ProductParts/getDetailPartsById"]('109478')

    await this.$store.dispatch('ProductParts/dataItemsPartsByFilter', {substr: 'asd',})
      // console.log(this.$store.getters[""])
    console.log( 'this.productsJson', this.productsJson)


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
/*.title-block__text-limit {*/
/*  overflow: hidden;*/
/*  text-overflow: ellipsis;*/
/*  display: -webkit-box;*/
/*  -webkit-line-clamp: 3; !* number of lines to show *!*/
/*  -webkit-box-orient: vertical;*/
/*}*/
</style>
