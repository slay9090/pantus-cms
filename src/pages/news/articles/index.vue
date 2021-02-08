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
