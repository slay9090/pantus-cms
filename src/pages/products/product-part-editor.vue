<template>
  <div>

    <div class="row  align-items-start">

      <div class="col-6">
        <div class="card " id="tbl">
          <h4 class="card-header"><small class="text-muted">Редактирование товар</small></h4>
          <div class="card-body">

            <div>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                <b-form-group id="input-group-product-id" label="ID:" label-for="input-product-id">
                  <b-form-input readonly id="input-product-id" v-model="form.product_id" required></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-product-name" label="Наименование:" label-for="product-name">
                  <b-form-input id="product-name" v-model="form.product_name" required
                                placeholder="Enter brand name"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-brand" label="Брэнд:" label-for="product-part-brand-edit">
                  <input-catalog
                      v-if="currentItemBrandInput"
                      id="product-part-brand-edit"
                      type-catalog="singleSelect"
                      :items="allItemsCatalogBrands"
                      modal-id="modal-product-part-brand-edit"
                  >
                    <router-link v-if="currentItemBrandInput" :to="'/catalog/brands/edit?id='+currentItemBrandInput.id">
                      {{ currentItemBrandInput.name }}
                    </router-link>
                  </input-catalog>
                </b-form-group>


                <b-form-group id="input-group-categories" label="Категории:" label-for="product-part-categories-edit">
                  <input-catalog
                      v-if="currentItemsCategoriesInput"
                      id="product-part-categories-edit"
                      type-catalog="multiSelectTree"
                      :items="allItemsCatalogCategories"
                      modal-id="modal-product-part-categories-edit"
                  >
                    <router-link v-for="(item, index) in currentItemsCategoriesInput" :key="index"
                                 :to="'/catalog/category/edit?id='+item.id">
                      {{ item.name }},
                    </router-link>
                  </input-catalog>
                </b-form-group>

                <b-form-group id="input-group-applicabilities" label="Применимости:"
                              label-for="product-part-applicabilities-edit">
                  <input-catalog
                      v-if="currentItemsApplicabilitiesInput"
                      id="product-part-applicabilities-edit"
                      type-catalog="multiSelectTree"
                      :items="allItemsCatalogApplicabilities"
                      modal-id="modal-product-part-applicabilities-edit"
                  >
                    <router-link v-for="(item, index) in currentItemsApplicabilitiesInput" :key="index"
                                 :to="'/catalog/applicabilities/edit?id='+item.id">
                      {{ item.name }},
                    </router-link>
                  </input-catalog>
                </b-form-group>

                <b-form-group id="input-group-article" label="Артикул:" label-for="article">
                  <b-form-input id="article" v-model="form.article_origin"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-productCardImages_main" label="Изображения:"
                              label-for="image-carousel-products-parts-edit">
                  <image-carousel
                      id="image-carousel-products-parts-edit"
                      :images="selectedImages"
                  />
                </b-form-group>


                <b-form-group id="input-group-prices" label="Цена:" label-for="prices">
                  <b-form-input id="categories" v-model="form.prices_retail"></b-form-input>
                </b-form-group>


                <b-button type="submit" variant="danger" class="">Удалить</b-button>
                <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
                <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>
              </b-form>

            </div>
          </div>
        </div>
      </div>

      <preview-request-body
          :data="form"
      />
    </div>
  </div>

</template>

<script>


import InputCatalog from "@/components/catalog/input-catalog";
import init from '@/mixins/forms/products/product-init'
import imageCarousel from '@/components/image-carousel'

export default {
  name: "ProductsListFormEdit",
  props: ["query"],
  mixins: [init,],
  components: {
    InputCatalog,
    imageCarousel,
  },

  data() {
    return {

      form: {
        product_id: '',
        product_name: '',
        brand_arr: [], // (ид) Имя
        categories_arr: [],
        applicabilities_arr: [],
        article_origin: '',
        productCardImages: [], // indx 0 - main img
        prices_retail: '',
        product_timestampUpdated: '',
      },

      productsJson: {},
      show: true,
      allItemsCatalogBrands: null,
      allItemsCatalogCategories: null,
      allItemsCatalogApplicabilities: null,

    }

  },
  methods: {

    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },

    onReset(evt) {
      evt.preventDefault()
      // Trick to reset/clear native browser form validation state
      this.form.name = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },


  },
  created() {
    this.dataInit();
  },
  async mounted() {

  },

  computed: {
    selectedImages() {
      if (this.$store.getters["ProductParts/selectedImages"][0]) {
        return this.$store.getters["ProductParts/selectedImages"]
      } else {
        return new Array('https://www.pantus.ru/images_uploader/images/no-image2.png')
      }
    },

    currentItemBrandInput() {
      return this.$store.getters["TempDataCatalog/getValueInputCatalog"]('product-part-brand-edit')
    },

    currentItemsCategoriesInput() {
      return this.$store.getters["TempDataCatalog/getValueInputCatalog"]('product-part-categories-edit')
    },

    currentItemsApplicabilitiesInput() {
      return this.$store.getters["TempDataCatalog/getValueInputCatalog"]('product-part-applicabilities-edit')
    },

  },

}
</script>

<style scoped>


</style>
