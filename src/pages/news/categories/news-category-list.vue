<template>
  <div class="home">

    <div class="card shadow" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Редактор новостей</small></h4>
      <div class="card-body">

          <div>
            <div class="py-3 d-flex  align-items-center">
              <div class="flex-grow-1 d-flex">

                <input-search
                    id="search-input-news-categories"
                    size="sm"
                    placeholder="Найти"
                    class="col-5 py-3"
                > </input-search>

                <b-button class="ml-3 py-1" :disabled="!valueSearchInput" @click="$_inputCleaned(inputType.search,'search-input-news-categories')">Clear</b-button>
              </div>
              <div class="p-2 px-1">
<!--                <b-button variant="outline-danger" class="py-1 mx-2" :disabled="selected.length === 0">Удалить</b-button>-->
                <b-button variant="outline-success" class="py-1 ">Создать</b-button>
              </div>
            </div>


            <table-static
                id="news-categories-list"
                :fields="fields"
                :per-page="20"
                :current-page="query"
                :filter="valueSearchInput"
                sort-by-field="id"

            >
              <template v-slot:cell(name)="data">
                <router-link :to="'/news/category/edit?id='+data.item.id" class="mb-0">{{ data.value }}</router-link>
              </template>
            </table-static>

          </div>

      </div>
    </div>


  </div>
</template>

<script>

import baseComponentsMixin from '@/mixins/base-components/inputs'


export default {
name: "NewsCategory",

  mixins: [baseComponentsMixin],
  props: ["query"],
  data() {
    return {

      fields: [
        { key: 'selected', label: '',  thStyle: {  width: '50px' }},
        { key: 'id',  sortable: true ,   },
        { key: 'name', sortable: true , },
        { key: 'code', },
      ],

      show: true,

    }
  },

  methods:{

    // openFormEdit: function (datarow) {
    //
    //   this.$router.push({ path: '/catalog/brands/edit', query: { id: datarow.id } })
    //
    // },

  },

  components: {
  },
  computed: {
    valueSearchInput() {
      return this.$store.getters["BaseComponents/getValueInputSearch"]('search-input-news-categories');
    },

  },
  async mounted() {
    await this.$store.dispatch("NewsCategory/GetData");
    this.$store.commit('BaseComponents/setDataLimitTable',
        {'key': 'news-categories-list', 'value': this.$store.getters["NewsCategory/AllItems"]}
        );
  }
}
</script>

<style scoped>

</style>
