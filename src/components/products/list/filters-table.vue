<template>
<!--  <b-container class="products-parts-list__filters mx-0 my-0">-->
<div>
  Фильтры:
    <b-row class="my-2 ">
      <b-col>
        <input-search
            :id="searchInputId"
        />
      </b-col>

      <b-col>
        <input-catalog
            v-if="filterValue.brand"
            :id="brandInputId"
            type-catalog="singleSelect"
            :items="allItemsCatalogBrands"
            modal-id="modal-catalog-brand-filter-parts-list"
        >

          <span v-if="filterValue.brand.id===0">Бренд не выбран</span>
          <router-link v-if="filterValue.brand" :to="'/catalog/brands/edit?id='+filterValue.brand.id">
            <span v-if="filterValue.brand.name ">{{ filterValue.brand.name }} </span>
          </router-link>
        </input-catalog>
      </b-col>

    </b-row>


    <b-row>
      <b-col>

        <input-catalog
            v-if="filterValue.categories"
            :id="categoriesInputId"
            :items="allItemsCatalogCategories"
            type-catalog="multiSelectTree"
            multi-mode="all-node"
            modal-id="modal-catalog-categories-filter-parts-list"
        >
          <span v-if="filterValue.categories.length===0">Категории не выбраны</span>
          <router-link v-for="(item, index) in filterValue.categories" :key="index"
                       :to="'/catalog/categories/edit?id='+item.id">
            <span > {{ item.name }}, </span>
          </router-link>
        </input-catalog>

      </b-col>
      <b-col>
        <input-catalog
            v-if="filterValue.applicabilities"
            :id="applicabilitiesInputId"
            :items="allItemsCatalogApplicabilities"
            type-catalog="multiSelectTree"
            multi-mode="all-node"
            modal-id="modal-catalog-applicabilities-filter-parts-list"
        >
          <span v-if="filterValue.applicabilities.length===0">Применимости не выбраны</span>
          <router-link v-for="(item, index) in filterValue.applicabilities" :key="index"
                       :to="'/catalog/applicabilities/edit?id='+item.id">
            <span > {{ item.name }}, </span>
          </router-link>
        </input-catalog>
      </b-col>
    </b-row>


    <b-row  align-h="between" class="my-3">

      <b-col cols="3">Найдено: {{itemsProductParts.meta.count}}</b-col>

      <b-col cols="3" class="text-right">
        <b-button class="mr-3" @click="clearAllFilters">Сбросить</b-button>
        <b-button @click="getItemsPartsByFilter">Найти</b-button>
        <!--                <b-button variant="outline-danger" class="py-1 mx-2" :disabled="selected.length === 0">Удалить</b-button>-->
<!--        <b-button variant="outline-success" class="">Создать</b-button>-->
      </b-col>
    </b-row>

</div>
<!--  </b-container>-->
</template>

<script>
import baseComponentsMixin from '@/mixins/base-components/inputs';
import InputCatalog from "@/components/catalog/input-catalog";
const jsonMaps = require ("@/store/json-config"); // json data-maps

export default {
  name: "filters",
  props: ["filter_substr"],
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

      let url = jsonMaps.urlMapFilterPartsGetList(
          {
            substr: this.filterValue.subString,
            brand: this.filterValue.brand,
            categories: this.filterValue.categories,
            applicabilities: this.filterValue.applicabilities,
          }
      );

    if(this.$route.query){
      if(JSON.stringify(url)!==JSON.stringify(this.$route.query)){
        await this.$router.push({ name: 'ProductsList', query: {...url} })
      }
    }

    },

    clearAllFilters () {
      this.$store.commit('BaseComponents/setValueInputSearch', {'key': this.searchInputId, 'value': null})
      this.$store.commit('TempDataCatalog/setValueInputCatalog', {'key': this.brandInputId, 'value': {id: 0}})
      this.$store.commit('TempDataCatalog/setValueInputCatalog', {'key': this.categoriesInputId, 'value': []})
      this.$store.commit('TempDataCatalog/setValueInputCatalog', {'key': this.applicabilitiesInputId, 'value': []})
    },

    setFiltersByRoute(url){
      this.$store.dispatch('TempDataCatalog/addFiltersByRoute', {
        substr_value: url.filter_substr ? url.filter_substr : null,
        substr_input_id: this.searchInputId,
        brand_value: url.filter_brands ? url.filter_brands : null,
        brand_input_id: this.brandInputId,
        categories_value: url.filter_categories ? url.filter_categories.split(',') : null,
        categories_input_id: this.categoriesInputId,
        applicabilities_value: url.filter_applicabilities ? url.filter_applicabilities.split(',') : null,
        applicabilities_input_id: this.applicabilitiesInputId,

      })
    },

  },

  computed: {

    allItemsCatalogBrands() {return this.$store.getters["CatalogBrands/allItems"]; },
    allItemsCatalogCategories()  { return this.$store.getters["CatalogCategories/allItems"]; },
    allItemsCatalogApplicabilities() { return this.$store.getters["CatalogApplicabilities/allItems"]; },

    itemsProductParts() { return this.$store.getters["ProductParts/getDataItemsPartsByFilter"]; },
   // dataTable() {  return this.$store.getters["TempDataTableDymamic/getDataInputCatalog"]('table-products-parts-list'); },

    filterValue() {
      const subString = this.$store.getters["BaseComponents/getValueInputSearch"](this.searchInputId);
      const brand = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.brandInputId);
      const categories = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.categoriesInputId);
      const applicabilities = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.applicabilitiesInputId);
      const filters = {subString, brand, categories, applicabilities}
      return filters
    },

  },

  async mounted() {

    await this.$store.dispatch('CatalogBrands/getDataAllItems')
    await this.$store.dispatch('CatalogCategories/getDataAllItems')
    await this.$store.dispatch('CatalogApplicabilities/getDataAllItems')

    this.setFiltersByRoute(this.$route.query)

  },

  watch: {
    $route() {
       // this.setFiltersByRoute(this.$route.query)
    }
  },

}
</script>

<style scoped>

</style>