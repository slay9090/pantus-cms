<template>
<!--  <b-container class="dynamic-table mx-0 my-3 " >-->
  <div>
    Данные:
    <b-table

        ref="selectableTable"
        selectable
        select-mode="single"
        selected-variant="warning"
        @row-selected="onRowSelected"
        id="my-table"
        :items="dataTable.data"
        :fields="fields"

        sort-icon-left
        responsive="sm"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        head-variant="light"
        small
    >

      <template v-slot:cell(selected)="{ rowSelected }">
        <template  v-if="rowSelected">
          <span  aria-hidden="true">&check;</span>

        </template>
        <template  v-else>
          <span  aria-hidden="true">&nbsp;</span>

        </template>
      </template>


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

    </b-table>



<!--  <b-pagination-nav-->
<!--      :link-gen="linkGen"-->
<!--      :number-of-pages="(rows/perPage)+1"-->
<!--      use-router-->
<!--      v-model="currentPage"-->
<!--  ></b-pagination-nav>-->


  <p class="mt-3">Current Page: {{ currentPage }}</p>


  <div>
    <p>
      Selected Rows:<br>
      {{ selected }}
    </p>
  </div>

  </div>
</template>

<script>
export default {
name: "dynamics-table",

  props: {
    id: {
      type: String,
      required: true,
    },

    // perPage: {
    //   type: Number,
    //   default: 10,
    // },
    // urlPageValue: {
    //   type: String,
    //   default: '1',
    // },


    sortByField: {
      type: String,
      default: null
    },
    sortDescMode: {
      type: Boolean,
      default: false,
    },

  },

  data(){
  return{

    perPage: 20, // кол-во строк в пагинации
    currentPage: this.query,
    sortBy: 'id',
    sortDesc: false,
    filter: null,
    selected: [],
    fields: [
      { key: 'selected', label:  '✓',  thStyle: {  width: '30px' }},
      { key: 'id',  sortable: true , label: 'id',  },
      { key: 'name', sortable: true , label: 'Наименование', },
      { key: 'brand.name', label: 'Бренд'  , },
      { key: 'categories', label: 'Категория'  , },
      { key: 'applicabilities', label: 'Применимости'  ,  },
      { key: 'sku.origin', label: 'Артикул'  , },
      { key: 'images.main.url', label: 'Изображение'  , },
      { key: 'offers', label: 'Оферы'  , thStyle: {  width: '130px' } },
      // { key: 'offers[0].dates.modified', sortable: true , label: 'Дата' , thStyle: {  width: '100px' }},
    ],
    show: true,
    spinerLoaderIsShow: true,


    productsJson:[],
  }
  },


  computed: {
    dataTable: {

      get() {
        console.log('this.$store.getters["TempDataTableDymamic/getDataInputCatalog"](this.id)', this.$store.getters["TempDataTableDymamic/getDataInputCatalog"](this.id))
        return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"](this.id)
      },
      set(val) {
        this.$store.commit('TempDataTableDymamic/setDataTable', {'key': this.id, 'value': val})
      },

    }
  },



  methods: {

    ///записать данные выбраной строки в таблице
    onRowSelected(items) {
      this.selected = items
    },

    /**
     * xxxxx
     * @param pageNum sdfgsfdgdfg
     * @returns {string|string}
     */
    linkGen(pageNum){
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    //сортировка по дате
  },

}
</script>

<style scoped>
.title-block__text-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>