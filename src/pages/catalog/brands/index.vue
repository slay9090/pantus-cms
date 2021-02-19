
<template>

  <b-container fluid>

    <b-card-group deck>


      <b-card title="Список брендов" header-tag="header" footer-tag="footer" class="shadow">
        <template #header>
<!--          <h6> <small class="text-muted">Бренды</small></h6>-->
          <h6 class="mb-0">Бренды</h6>
        </template>
        <b-card-text>

          <div class="py-3 d-flex  align-items-center">
            <div class="flex-grow-1 d-flex">
              <input-search
                  id="search-input-catalog-brands"
                  size="sm"
                  class="col-4 py-3"
                  placeholder="Поиск"
              ></input-search>
              <b-button class="ml-3 py-1" :disabled="!valueSearchInput" @click="$_inputCleaned(inputType.search,'search-input-catalog-brands')">Clear</b-button>
            </div>
            <div class="p-2 px-1">
              <b-button variant="outline-danger" class="py-1 mx-2" >Удалить</b-button>
              <b-button variant="outline-success" class="py-1 ">Создать</b-button>
            </div>

          </div>

          <table-static
              id="catalog-brands-list"
              :fields="fields"
              :items="itemDataTab"
              :is-load="spinerLoaderIsShow"
              responsive="sm"
              :per-page="20"
              :filter="valueSearchInput"
              small
              head-variant="light"
              hover
          >

            <template v-slot:cell(name)="data">
              <router-link :to="`/catalog/brands/edit/${data.item.id}`">{{ data.value }}</router-link>
            </template>

          </table-static>


        </b-card-text>


      </b-card>


    </b-card-group>



  </b-container>


</template>

<script>
// @ is an alias to /src
import baseComponentsInputMixin from '@/mixins/base-components/inputs'

export default {
  name: 'Home',
  mixins: [baseComponentsInputMixin],


  data() {
    return {
      spinerLoaderIsShow: true,
      fields: [
        { key: 'selected', label: '',  thStyle: {  width: '50px' }},
        { key: 'id',  sortable: true ,   },
        { key: 'name', sortable: true , },
      ],

    }
  },

  methods:{
    onRowSelected(items) {
      this.selected = items
    },

  },

  components: {
  },
  computed: {

    valueSearchInput() {
      return this.$store.getters["BaseComponents/getValueInputSearch"]('search-input-catalog-brands');
    },

    // rows() {
    //   return this.itemDataTab.length
    // },

    itemDataTab(){
      return this.$store.getters["CatalogBrands/allItems"];
    }



  },
  async mounted() {
    await this.$store.dispatch("CatalogBrands/getDataAllItems");
    this.spinerLoaderIsShow= false
  }

}

</script>

<style scoped>

</style>
