<template>

  <div>
    <b-pagination-nav

        :link-gen="linkGen"
        :number-of-pages="(itemsCount/itemsOnPage)+1"
        use-router
        first-number
        last-number
        v-model="currentPage"

    ></b-pagination-nav>

  </div>


</template>

<script>


export default {
name: "table-paginations",

  props: {
    itemsOnPage: Number,
    itemsCount: Number,
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
  data(){
  return{
    currentPage: this.$route.query.page_number ? this.$route.query.page_number : 1,
  }
  },

  watch: {
    $route() {
      /// сбросить карент пейдж, если нет пагинации в урл
      this.$route.query.page_number ?  null : this.currentPage = 1;
    }
  },
}
</script>

<style scoped>

</style>