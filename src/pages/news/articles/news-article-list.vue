<template>

  <div class="articles">

    <div class="card shadow" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Редактор новостей</small></h4>
      <div class="card-body">
        <ul>
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

            <table-limit-data
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
                  <router-link :to="'/news/articles/edit?id='+data.item.id" class="mb-0">{{ data.value }}</router-link>
                </template>
            </table-limit-data>

          </div>

        </ul>
      </div>
    </div>

  </div>

</template>

<script>
import baseComponentsMixin from '@/mixins/base-components/inputs'

export default {

name: "NewsArticle",

  mixins: [baseComponentsMixin],

  props: ["query"],

  data() {
    return {

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
    await this.$store.dispatch("NewsArticles/GetData");
    let data = await this.$store.getters["NewsArticles/AllItems"];
    this.$store.commit('BaseComponents/setDataLimitTable', {'key': 'news-articles-list-table', 'value': data});
  },

  watch: {
    '$route' (){
      //скролл на верх при переходе по пагинации
      window.scrollTo(0,0)
    }
  },

}

</script>

<style scoped>

</style>
