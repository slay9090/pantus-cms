<template>

  <b-container fluid class="articles">

    <b-row>
      <b-col>
        <b-card
            header-tag="header"
            class="shadow w-100"
        >
          <template #header>
            <h4><small class="text-muted">Запчасти</small></h4>
          </template>

          <b-card-text>

            <div>
              <div class="py-3 d-flex  align-items-center">
                <div class="flex-grow-1 d-flex">

                  <input-search
                      id="search-input-news-article"
                      size="sm"
                      placeholder="Найти"
                      class="col-4 py-3"
                  > </input-search>

                  <b-button
                      class="ml-3 py-1"
                      :disabled="!valueSearchInput"
                      @click="$_inputCleaned(inputType.search,'search-input-news-article')"
                  >Clear
                  </b-button>


                </div>
                <div class="p-2 px-1">
                  <!--                !!! не удалять кнопку, потом пробросить ов вьюкс выбранную в таблице строку-->
                  <!--                <b-button variant="outline-danger" class="py-1 mx-2" :disabled="selected.length === 0">Удалить</b-button>-->
                  <b-button variant="outline-success" class="py-1 ">Создать</b-button>
                </div>

              </div>
              <b-overlay :show="spinerLoaderIsShow" no-fade rounded="sm">
                <table-static
                    id="news-articles-list-table"
                    :fields="fields"
                    :per-page="20"
                    :current-page="query"
                    :filter="valueSearchInput"
                    sort-by-field="dates.updated"
                    :sort-desc-mode="true"
                    head-variant="light"
                    small
                    responsive="sm"
                    selectable
                    select-mode="single"
                    selected-variant="warning"
                    :sort-compare="myCompare"
                    :sort-by="'dates.updated'"
                    :sort-desc="true"

                >
                  <template v-slot:cell(preview.image)="data">
                    <img :src="data.value" style="max-width: 100%"/>
                  </template>

                  <template v-slot:cell(name)="data">
                    <router-link :to="'/news/articles/edit/'+data.item.id" class="mb-0">{{ data.value }}</router-link>
                  </template>
                </table-static>
              </b-overlay>
            </div>

          </b-card-text>
        </b-card>
      </b-col>
    </b-row>





<!--    -->



  </b-container>

</template>

<script>
import baseComponentsMixin from '@/mixins/base-components/inputs'

export default {

name: "NewsArticle",

  mixins: [baseComponentsMixin],

  props: ["query"],

  data() {
    return {
      spinerLoaderIsShow: true,
      fields: [
        { key: 'selected', label:  '✓',  thStyle: {  width: '30px' }},
        { key: 'id',  sortable: true ,  thStyle: {  width: '80px' } },
        { key: 'name', sortable: true , label: 'Заголовок',  thStyle: {  width: '200px' }},
        { key: 'preview.text', label: 'Текст'  ,  thStyle: {  width: '100px' }},
        { key: 'category.name', label: 'Категория'  ,  thStyle: {  width: '100px' }},
        { key: 'preview.image', label: 'Изображение'  ,  thStyle: {  width: '100px' }},
        { key: 'dates.updated', sortable: true , label: 'Дата' , thStyle: {  width: '100px' }},
      ],

    }
  },

  methods:{
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

    },

  },

  computed: {

    valueSearchInput() {
        return this.$store.getters["BaseComponents/getValueInputSearch"]('search-input-news-article');
    },

    dataTableLimit(){
      return this.$store.getters["BaseComponents/getDataLimitTable"]('news-articles-list-table');
    }

  },

  async mounted() {
    await this.$store.dispatch("NewsArticles/pullNewsList");
    let data = await this.$store.getters["NewsArticles/getNewsList"];
    this.$store.commit('BaseComponents/setDataTable', {'key': 'news-articles-list-table', 'value': data});
    this.spinerLoaderIsShow = false
  },

  watch: {
    $route (){
      //скролл на верх при переходе по пагинации
      window.scrollTo(0,0)
    }
  },

}

</script>

<style scoped>

</style>
