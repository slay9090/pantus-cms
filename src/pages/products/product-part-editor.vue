<template>
  <b-container fluid>


    <b-overlay :show="spinerLoaderIsShow" no-fade rounded="sm">
  <b-row  v-if="!initFailed" cols="1" cols-xl="2">





      <b-col  class="mb-3 mb-xl-0" >

        <b-card header-tag="header">
          <template #header>
            <h4><small class="text-muted">Редактирование карточки</small></h4>
          </template>

          <b-card-text>

            <b-form @submit="onSubmit" @reset="onReset" >


              <b-form-group id="input-group-product-id" label="ID:" label-for="input-product-id">
                <b-form-input readonly :id="identifierComponents.input.id" v-model="formData.id" required></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-product-name" label="Наименование:" label-for="product-name">
                <b-form-input :id="identifierComponents.input.name" v-model="formData.name" required
                              placeholder="Enter brand name"></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-brand" label="Брэнд:" label-for="product-part-brand-edit">
                <input-catalog
                    v-if="currentItemBrandInput"
                    :id="identifierComponents.input.brand"
                    type-catalog="singleSelect"
                    :items="allItemsCatalogBrands"
                    modal-id="modal-product-part-brand-edit"
                    modal-title-name="Выбор бренда"
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
                    modal-title-name="Выбор категорий"
                >
                  <router-link v-for="(item, index) in currentItemsCategoriesInput" :key="index"
                               :to="'/catalog/category/edit?id='+item.id">
                    {{ item.name }},
                  </router-link>
                </input-catalog>
              </b-form-group>

              <b-form-group id="input-group-applicabilities" label="Применяемости:"
                            label-for="product-part-applicabilities-edit">
                <input-catalog
                    v-if="currentItemsApplicabilitiesInput"
                    :id="identifierComponents.input.applicabilities"
                    type-catalog="multiSelectTree"
                    :items="allItemsCatalogApplicabilities"
                    modal-id="modal-product-part-applicabilities-edit"
                    multi-mode="only-last-node"
                    modal-title-name="Выбор применяемостей"
                >
                  <router-link v-for="(item, index) in currentItemsApplicabilitiesInput" :key="index"
                               :to="'/catalog/applicabilities/edit?id='+item.id">
                    {{ item.name }},
                  </router-link>
                </input-catalog>
              </b-form-group>

              <b-form-group id="input-group-sku" label="Артикул:" :label-for="identifierComponents.input.sku">
                <input-sku
                    :id="identifierComponents.input.sku"
                />
              </b-form-group>

              <b-form-group id="input-group-productCardImages_main" label="Изображения:"
                            label-for="image-carousel-products-parts-edit">


                <image-carousel
                    v-if="formData.images"
                    id="image-carousel-products-parts-edit"
                    :images="formData.images"
                    heigh-block="400"
                >
                  <template #btn>
                    <image-manager

                        :id="identifierComponents.input.imageManagerId"
                        modal-id="news-edit-image-preview"
                        :images="getImagesProduct()"
                    >
                      <template #btn>
                        <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" ></i>
                      </template>
                    </image-manager>
                  </template>
                </image-carousel>




              </b-form-group>

              <b-form-group label="Активный:" v-slot="{ ariaDescribedby }" >
                <b-container >
                  <b-row align-h="start">
                    <b-col cols="1"><b-form-radio v-model="activity" :aria-describedby="ariaDescribedby" name="some-radios" :value="true">Да</b-form-radio></b-col>
                    <b-col cols="1"> <b-form-radio v-model="activity" :aria-describedby="ariaDescribedby" name="some-radios" :value="false">Нет</b-form-radio></b-col>
                  </b-row>
                </b-container>
              </b-form-group>



              <b-button type="submit" variant="danger" class="">Удалить</b-button>
              <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
              <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>

            </b-form>

          </b-card-text>

        </b-card>

      </b-col>


      <b-col class="">
        <b-card header-tag="header">
          <template #header>
            <h4><small class="text-muted">Предложения</small></h4>
          </template>
          <b-card-text>

            <table-static
                v-if="formData.offers.length > 0 "
                :id="identifierComponents.table.offers"
                :fields="fields"
            />
            <span v-else>Нет предложений</span>

          </b-card-text>
        </b-card>
      </b-col>












  </b-row>
      <div v-else>
        <h5 class="text-center text-danger " >Ошибка инициализации данных </h5>
        <h5 class="text-center text-danger ">или указанный ID не существует</h5>
      </div>
    </b-overlay>

  </b-container>
</template>

<script>

import InputCatalog from "@/components/catalog/input-catalog";
import init from '@/mixins/service/products/product-init';
import ImageManager from "@/components/images-manager/index";
import ImageCarousel from "@/components/image-carousel";

export default {
  name: "ProductsListFormEdit",
  props: ["query"],
  mixins: [init,],
  components: {
    InputCatalog,
    ImageCarousel,
    ImageManager,

  },

  data() {
    return {
      spinerLoaderIsShow: true,

      identifierComponents: {
        input: {
          id: 'input-product-id',
          name: 'product-name',
          sku: 'product-part-sku-edit',
          brand: 'product-part-brand-edit',
          categories: 'product-part-categories-edit',
          applicabilities: 'product-part-applicabilities-edit',
          imageManagerId: 'part-edit-images-manager'
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
      activity: true,


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
    console.log(this.formData)
   // console.log(this.formData)
  },

  computed: {
    formData() {
      const id = this.$store.getters["BaseComponents/getValueInputIndex"](this.identifierComponents.input.id);
      const name = this.$store.getters["BaseComponents/getValueInputText"](this.identifierComponents.input.name);
      const brand = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.identifierComponents.input.brand);
      const categories = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.identifierComponents.input.categories);
      const applicabilities = this.$store.getters["TempDataCatalog/getValueInputCatalog"](this.identifierComponents.input.applicabilities);
      const images = this.$store.getters["NewFileManager/getCurrentFiles"](this.identifierComponents.input.imageManagerId)
      const offers = this.$store.getters["BaseComponents/getDataTable"](this.identifierComponents.table.offers) ? this.$store.getters["BaseComponents/getDataTable"](this.identifierComponents.table.offers) : []
      const vendorCode = this.$store.getters["BaseComponents/getValueInputVendorCode"](this.identifierComponents.input.sku)
      const activity = this.activity
      return {id, name, brand, categories, applicabilities, images, offers, vendorCode, activity}
    },

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

i {
  cursor: pointer;
  color: #007bff;
  opacity: 0.6;
}

i:hover {
  opacity: 1;
}

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
