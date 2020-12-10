<template>
  <div>
  <div class="mx-3" v-if="!initFailed">

    <b-overlay :show="spinerLoaderIsShow" no-fade rounded="sm">
    <div class="row  align-items-start " v-if="!spinerLoaderIsShow">

      <div class="parts-edit-form px-0 col-auto col-xl-6 mr-xl-5 order-1 order-xl-0 " >
        <div class="card shadow" id="tbl">
          <h4 class="card-header"><small class="text-muted">Редактирование товар</small></h4>
          <div class="card-body">

            <div>
              <b-form @submit="onSubmit" @reset="onReset" >


                <b-form-group id="input-group-product-id" label="ID:" label-for="input-product-id">
                  <b-form-input readonly :id="identifierComponents.input.id" v-model="form.product_id" required></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-product-name" label="Наименование:" label-for="product-name">
                  <b-form-input :id="identifierComponents.input.name" v-model="form.product_name" required
                                placeholder="Enter brand name"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-brand" label="Брэнд:" label-for="product-part-brand-edit">
                  <input-catalog
                      v-if="currentItemBrandInput"
                      :id="identifierComponents.input.brand"
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
                      :id="identifierComponents.input.categories"
                      type-catalog="multiSelectTree"
                      :items="allItemsCatalogCategories"
                      modal-id="modal-product-part-categories-edit"
                      multi-mode="only-last-node"
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
                      :id="identifierComponents.input.applicabilities"
                      type-catalog="multiSelectTree"
                      :items="allItemsCatalogApplicabilities"
                      modal-id="modal-product-part-applicabilities-edit"
                      multi-mode="only-last-node"
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
                      modal-id="modal-products-parts-edit"
                  />
                </b-form-group>


<!--                <b-form-group id="input-group-prices" label="Цена:" label-for="prices">-->
<!--                  <b-form-input id="categories" v-model="form.prices_retail"></b-form-input>-->
<!--                </b-form-group>-->

<!--                <input-price-->
<!--                    id="products-part-price-edit"-->

<!--                    placeholder="Цена"-->
<!--                />-->


                <b-button type="submit" variant="danger" class="">Удалить</b-button>
                <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
                <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>

              </b-form>

            </div>
          </div>
        </div>
      </div>


      <div class="parts-view-offers px-0 card col-xl-auto shadow  order-0 order-xl-1 mb-3 mb-xl-0" >
        <h4 class="card-header"><small class="text-muted">Торговые предложения</small></h4>
        <div class="card-body">

          <table-static
              v-if="form.offers.length > 0"
              :id="identifierComponents.table.offers"
              :fields="fields"
          />
          <span v-else>Нет предложений</span>
        </div>
      </div>


    </div>
    </b-overlay>
  </div>
    <div v-else>
      <h5 class="text-center text-danger " >Ошибка инициализации данных </h5>
      <h5 class="text-center text-danger ">или указанный ID не существует</h5>
    </div>
  </div>
</template>

<script>

import InputCatalog from "@/components/catalog/input-catalog";
import init from '@/mixins/forms/products/product-init';
import imageCarousel from '@/components/image-carousel';

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
      spinerLoaderIsShow: true,
      form: {
        product_id: '',
        product_name: '',
        brand_arr: [], // (ид) Имя
        categories_arr: [],
        applicabilities_arr: [],
        article_origin: '',
        images: [], // indx 0 - main img
        prices_retail: '',
        dates: '',
        offers: [],
        params: null,
      },

      identifierComponents: {
        input: {
          id: 'input-product-id',
          name: 'product-name',
          brand: 'product-part-brand-edit',
          categories: 'product-part-categories-edit',
          applicabilities: 'product-part-applicabilities-edit',
        },
        table: {
          offers: 'part-edit-table-offers',
        },
      },

      productsJson: {},
     // show: true,
      allItemsCatalogBrands: null,
      allItemsCatalogCategories: null,
      allItemsCatalogApplicabilities: null,

      fields: [
        // { key: 'selected', label:  '✓',  thStyle: {  width: '30px' }},
        { key: 'id',    thStyle: {  width: '80px' } },
         { key: 'supplier.name', sortable: true , label: 'Поставщик',  thStyle: {  width: '100px' }},
        // { key: 'activity', label: 'Активен'  ,  thStyle: {  width: '100px' }},
         // { key: 'guid', label: 'guid'  ,  thStyle: {  width: '100px' }},
         { key: 'price', label: 'Цена, руб.'  ,  thStyle: {  width: '100px' }},
         { key: 'quantity', label: 'Кол-во' , thStyle: {  width: '70px' }},
        { key: 'measure', label: 'Ед.' , thStyle: {  width: '30px' }},
        { key: 'supplier.deliveryDelay', label: 'Срок' , thStyle: {  width: '30px' }},
      ],

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
     // this.form.name = ''
      //this.show = false
      this.$nextTick(() => {
       // this.show = true
      })
    },


  },

  async mounted() {
   await this.dataInit();
    this.spinerLoaderIsShow = false;
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

@media screen and (max-width: 900px) {
  .parts-view-offers {
    min-width: 500px !important;
  }
  .parts-edit-form  {
    min-width: 500px !important;
  }
}

@media screen and (min-width: 900px) {
  .parts-edit-form  {
    max-width: 700px !important;
    min-width: 650px !important;
  }
  .parts-view-offers {
    max-width: 700px !important;
  }
}

</style>
