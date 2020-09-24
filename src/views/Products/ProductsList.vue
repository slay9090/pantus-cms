<template>
  <div>



    <div class="card" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Список продукции</small></h4>
      <div class="card-body">
        <ul>
          <div>
            <div class="py-3 d-flex  align-items-center">
              <div class="flex-grow-1 d-flex">
                <b-form-input size="sm" class="col-3 py-3"
                              v-model="filter"
                              type="search"
                              id="filterInput"
                              placeholder="Type to Search"
                ></b-form-input>
                <b-button class="ml-3 py-1" :disabled="!filter" @click="filter = ''">Clear</b-button>
              </div>
              <div class="p-2 px-1">
                <b-button variant="outline-danger" class="py-1 mx-2" :disabled="selected.length == 0">Удалить</b-button>
                <b-button variant="outline-success" class="py-1 ">Создать</b-button>
              </div>

            </div>

            <b-overlay :show="spinerLoaderIsShow" no-fade rounded="sm">
              <b-table
                  ref="selectableTable"
                  selectable
                  select-mode="single"
                  selected-variant="warning"
                  @row-selected="onRowSelected"
                  id="my-table"
                  :items="productsJson"
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


                <template v-slot:cell(productCard.name)="data">
                  <!-- `data.value` is the value after formatted by the Formatter -->
                  <a :href="'/products/list/edit?id='+data.item.productCard.id"  class="mb-0" >{{ data.value }} </a>
                </template>


                <template v-slot:cell(productCard.productCardImages.main.url)="data">
                  <img :src="data.value" width="50" height="30"/>
                </template>

                <template v-slot:cell(productCard.categories)="data">
                  <span v-for="item in data.value" :key="item.id">{{item.name}}, </span>
                </template>

                <template v-slot:cell(productCard.applicabilities)="data">
                  <span v-for="item in data.value" :key="item.id">{{item.name}}, </span>
                </template>



              </b-table>
            </b-overlay>
            <b-pagination-nav
                :link-gen="linkGen"
                :number-of-pages="(rows/perPage)+1"
                use-router
                v-model="currentPage"
            ></b-pagination-nav>


            <p class="mt-3">Current Page: {{ currentPage }}</p>

          </div>
          <div>
            <p>
              Selected Rows:<br>
              {{ selected }}
            </p>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "ProductsList",
  props: ["query"],

  data() {
    return {

      perPage: 20, // кол-во строк в пагинации
      currentPage: this.query,
      sortBy: 'id',
      sortDesc: false,
      filter: null,
      selected: [],
      fields: [
        { key: 'selected', label:  '✓',  thStyle: {  width: '30px' }},
        { key: 'productCard.id',  sortable: true , label: 'id',  },
        { key: 'productCard.name', sortable: true , label: 'Наименование', },
        { key: 'productCard.brand.name', label: 'Бренд'  , },
        { key: 'productCard.categories', label: 'Категория'  , },
        { key: 'productCard.applicabilities', label: 'Применимости'  ,  },
        { key: 'productCard.sku.original', label: 'Артикул'  , },
        { key: 'productCard.productCardImages.main.url', label: 'Изображение'  , },
        { key: 'productOffer.prices.retail', label: 'Цена'  , },
        { key: 'productCard.timestampUpdated', sortable: true , label: 'Дата' , thStyle: {  width: '100px' }},
      ],
      show: true,
      spinerLoaderIsShow: true,


      productsJson:[],



    }
  },
  methods:{

    //записать данные выбраной строки в таблице
    onRowSelected(items) {
      this.selected = items
    },

    //генерация урл для пагинации
    linkGen(pageNum){
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    //сортировка по дате

  },
  computed: {

    //кол-во строк в таблице
    rows() {

      return this.productsJson.length

    }

  },
  async mounted() {

    this.spinerLoaderIsShow= false
    await this.$store.dispatch("List/GetDataProducts");
    this.productsJson = await this.$store.getters["List/ProductsItems"]
   // console.log('asdasd '+this.productsJson.length)

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
