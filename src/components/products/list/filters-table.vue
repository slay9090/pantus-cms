<template>
  <b-container class="products-parts-list__filters mx-0 my-0">

  Фильтры:
    <b-row class="my-2 ">
      <b-col>
        <input-search
            :id="searchInputId"
        />
      </b-col>

      <b-col>
        <input-catalog
            v-if="currentFiltersBrand"
            :id="brandInputId"
            type-catalog="singleSelect"
            :items="allItemsCatalogBrands"
            modal-id="modal-catalog-brand-filter-parts-list"
        >

          <span v-if="currentFiltersBrand.id===0">Бренд не выбран</span>
          <router-link v-if="currentFiltersBrand" :to="'/catalog/brands/edit?id='+currentFiltersBrand.id">
            <span v-if="currentFiltersBrand.name ">{{ currentFiltersBrand.name }} </span>
          </router-link>
        </input-catalog>
      </b-col>

    </b-row>


    <b-row>
      <b-col>

        <input-catalog
            v-if="currentFilterCategories"
            :id="categoriesInputId"
            :items="allItemsCatalogCategories"
            type-catalog="multiSelectTree"
            multi-mode="all-node"
            modal-id="modal-catalog-categories-filter-parts-list"
        >
          <span v-if="currentFilterCategories.length===0">Категории не выбраны</span>
          <router-link v-for="(item, index) in currentFilterCategories" :key="index"
                       :to="'/catalog/categories/edit?id='+item.id">
            <span > {{ item.name }}, </span>
          </router-link>
        </input-catalog>

      </b-col>
      <b-col>
        <input-catalog
            v-if="currentFilterApplicabilities"
            :id="applicabilitiesInputId"
            :items="allItemsCatalogApplicabilities"
            type-catalog="multiSelectTree"
            multi-mode="all-node"
            modal-id="modal-catalog-applicabilities-filter-parts-list"
        >
          <span v-if="currentFilterApplicabilities.length===0">Применимости не выбраны</span>
          <router-link v-for="(item, index) in currentFilterApplicabilities" :key="index"
                       :to="'/catalog/applicabilities/edit?id='+item.id">
            <span > {{ item.name }}, </span>
          </router-link>
        </input-catalog>
      </b-col>
    </b-row>


    <b-row  align-h="end" class="my-3">

      <b-col cols="3" class="text-right" align-self="end">
        <b-button class="" @click="clearAllFilters">Clear</b-button>
        <b-button @click="getItemsPartsByFilter">Найти</b-button>
        <!--                <b-button variant="outline-danger" class="py-1 mx-2" :disabled="selected.length === 0">Удалить</b-button>-->
        <b-button variant="outline-success" class="">Создать</b-button>
      </b-col>
    </b-row>


  </b-container>
</template>

<script>
import baseComponentsMixin from '@/mixins/base-components/inputs';
import InputCatalog from "@/components/catalog/input-catalog";


export default {
  name: "filters",
  components: {
    InputCatalog,
  },

  data() {
    return {
      tableId: 'table-products-parts-list',
      brandInputId: 'input-catalog-brand-filter-parts-list',
      searchInputId: 'input-search-substring-filter-parts-list',
      categoriesInputId: 'input-categories-filter-parts-list',
      applicabilitiesInputId: 'input-applicabilities-filter-parts-list',
    }
  },

  mixins: [baseComponentsMixin],


  methods: {

    async getItemsPartsByFilter() {
      this.$store.commit('TempDataTableDymamic/setDataTable', {'key': this.tableId, 'value': null})
      await this.$store.dispatch('ProductParts/dataItemsPartsByFilter', {substr: this.valueSearchInput,})
      console.log(this.$store.getters["ProductParts/getDataItemsPartsByFilter"])
      this.$store.commit('TempDataTableDymamic/setDataTable', {'key': this.tableId, 'value': this.itemsProductParts})
    },

    clearAllFilters () {
      this.$store.commit('BaseComponents/setValueInputSearch', {'key': this.searchInputId, 'value': null})
      this.$store.commit('TempDataCatalog/setValueInputCatalog', {'key': this.brandInputId, 'value': null})
    },

  },

  computed: {

    allItemsCatalogBrands() {return this.$store.getters["CatalogBrands/allItems"]; },
    allItemsCatalogCategories()  { return this.$store.getters["CatalogCategories/allItems"]; },
    allItemsCatalogApplicabilities() { return this.$store.getters["CatalogApplicabilities/allItems"]; },

    currentFiltersBrand() {return this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.brandInputId)},
    currentFilterCategories() {return this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.categoriesInputId)},
    currentFilterApplicabilities() {return this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.applicabilitiesInputId)},

    valueSearchInput() { return this.$store.getters["BaseComponents/getValueInputSearch"](this.searchInputId);  },
    itemsProductParts() { return this.$store.getters["ProductParts/getDataItemsPartsByFilter"]; },
   // dataTable() {  return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list'); },

  },

  async mounted() {
    await this.$store.dispatch('CatalogBrands/getDataAllItems')
    await this.$store.dispatch('CatalogCategories/getDataAllItems')
    await this.$store.dispatch('CatalogApplicabilities/getDataAllItems')

    await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
        {
          'key': this.brandInputId,
          'value': {id: 0}
        })

    await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog', {
      'key': this.categoriesInputId,
      'value': []
    })

    await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog', {
      'key': this.applicabilitiesInputId,
      'value': []
    })

  }

}
</script>

<style scoped>

</style>