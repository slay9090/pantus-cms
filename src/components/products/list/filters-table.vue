<template>
  <div class="products-parts-list__filters">
    <div class="py-3 d-flex  align-items-center">
      <div class="flex-grow-1 d-flex">
        <input-search
            id="input-search-substring-filter-parts-list"
        />

        <input-catalog
            id="input-catalog-brand-filter-parts-list"
            type-catalog="singleSelect"
            :items="allItemsCatalogBrands"
            modal-id="modal-catalog-brand-filter-parts-list"
        >
<!--          <router-link v-if="currentItemBrandInput" :to="'/catalog/brands/edit?id='+currentItemBrandInput.id">-->
<!--            {{ currentItemBrandInput.name }}-->
<!--          </router-link>-->
        </input-catalog>

        <b-button class="ml-3 py-1"
                  :disabled="!valueSearchInput"
                  @click="$_inputCleaned(inputType.search,'input-search-substring-filter-parts-list')"
        >Clear
        </b-button>

        <b-button @click="getItemsPartsByFilter">Найти</b-button>


      </div>
      <div class="p-2 px-1">
        <!--                <b-button variant="outline-danger" class="py-1 mx-2" :disabled="selected.length === 0">Удалить</b-button>-->
        <b-button variant="outline-success" class="py-1 ">Создать</b-button>
      </div>

    </div>
  </div>
</template>

<script>
import baseComponentsMixin from '@/mixins/base-components/inputs';
import InputCatalog from "@/components/catalog/input-catalog";
import imageCarousel from "@/components/image-carousel";

export default {
  name: "filters",
  components: {
    InputCatalog,
  },

  data() {
    return {
      tableId: 'table-products-parts-list'
    }
  },

  mixins: [baseComponentsMixin],


  methods: {

    async getItemsPartsByFilter() {
      this.$store.commit('TempDataTableDymamic/setDataTable', {'key': this.tableId, 'value': null})
      await this.$store.dispatch('ProductParts/dataItemsPartsByFilter', {substr: this.valueSearchInput,})
      console.log(this.$store.getters["ProductParts/getDataItemsPartsByFilter"])
      this.$store.commit('TempDataTableDymamic/setDataTable', {'key': this.tableId, 'value': this.itemsProductParts})
    }

  },

  computed: {

    allItemsCatalogBrands() {return this.$store.getters["CatalogBrands/allItems"]; },
    allItemsCatalogCategories()  { return this.$store.getters["CatalogCategories/allItems"]; },
    allItemsCatalogApplicabilities() { return this.$store.getters["CatalogApplicabilities/allItems"]; },

    valueSearchInput() { return this.$store.getters["BaseComponents/getValueInputSearch"]('input-search-substring-filter-parts-list');  },
    itemsProductParts() { return this.$store.getters["ProductParts/getDataItemsPartsByFilter"]; },
  },

  async mounted() {
    await this.$store.dispatch('CatalogBrands/getDataAllItems')
    await this.$store.dispatch('CatalogCategories/getDataAllItems')
    await this.$store.dispatch('CatalogApplicabilities/getDataAllItems')

    await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
        {
          'key': 'input-catalog-brand-filter-parts-list',
          'value': {id: 0}
        })
  }

}
</script>

<style scoped>

</style>