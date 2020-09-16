<template>



  <div class="home">

    <div class="card" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Редактор новостей</small></h4>
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


            <b-table
                ref="selectableTable"
                selectable
                select-mode="single"
                selected-variant="warning"
                @row-selected="onRowSelected"
                id="my-table"
                :items="itemDataTab"
                :fields="fields"
                :sort-compare="myCompare"
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
                <a :href="'/news/articles/edit?id='+data.item.id"  class="mb-0" >{{ data.value }} </a>
              </template>


              <template v-slot:cell(preview.image)="data">
                <img :src="data.value" />
              </template>



            </b-table>

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


    <router-view></router-view>
  </div>

</template>

<script>
export default {
name: "NewsArticle",
  props: ["query"],

  data() {
    return {
      perPage: 20, // кол-во строк в пагинации
      currentPage: this.query,
      sortBy: 'id',
      sortDesc: false,
      filter: null,
      selected: [],
      itemDataTab: [],
      fields: [
        { key: 'selected', label:  '✓',  thStyle: {  width: '30px' }},
        { key: 'id',  sortable: true ,  thStyle: {  width: '80px' } },
        { key: 'name', sortable: true , label: 'Заголовок',  thStyle: {  width: '200px' }},
        { key: 'preview.text', label: 'Текст'  ,  thStyle: {  width: '100px' }},
        { key: 'category.name', label: 'Категория'  ,  thStyle: {  width: '100px' }},
        { key: 'preview.image', label: 'Изображение'  ,  thStyle: {  width: '100px' }},
        { key: 'dates.updated', sortable: true , label: 'Дата' , thStyle: {  width: '100px' }},
      ],
      show: true,
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
    myCompare(itemA, itemB, key) {
      if (key !== 'dates.updated') {
        // If field is not `date` we let b-table handle the sorting
        return false
      } else {
        // Convert the string formatted date to a number that can be compared
        // Get the values being compared from the items
        let a = itemA['dates']['updated']
        let b = itemB['dates']['updated']
        // Split them into an array of parts (dd, mm, and yyyy)
       // console.log(itemA['dates']['updated'])
       // console.log(a, " ", b)
        a = a.split(' ')
        b = b.split(' ')

       // console.log(a[0], " ", b[0])
        a = a[0].split('.')
        b = b[0].split('.')
       // console.log(a, " ", b)
        //
        // // convert string parts to numbers
        a = (parseInt(a[2], 10) * 10000) + (parseInt(a[1], 10) * 100) + parseInt(a[0])
        b = (parseInt(b[2], 10) * 10000) + (parseInt(b[1], 10) * 100) + parseInt(b[0])
        // Return the comparison result
        return a - b
      }

  }
  },

  components: {

  },
  computed: {

    //кол-во строк в таблице
    rows() {
      return this.itemDataTab.length
    }

  },
  async mounted() {
    await this.$store.dispatch("NewsArticles/GetData");
    let data = await this.$store.getters["NewsArticles/AllItems"];
    this.itemDataTab = data;

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
