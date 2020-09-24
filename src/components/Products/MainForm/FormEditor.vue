<template>
  <div>

    <div class="row  align-items-start">

      <div class="col-6">
      <div class="card " id="tbl" >
        <h4 class="card-header"> <small class="text-muted">Редактирование товар</small></h4>
        <div class="card-body">

          <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

              <b-form-group id="input-group-product-id" label="ID:" label-for="input-product-id">
                <b-form-input readonly id="input-product-id" v-model="form.product_id" required></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-product-name" label="Наименование:" label-for="product-name">
                <b-form-input id="product-name" v-model="form.product_name" required placeholder="Enter brand name"></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-brand" label="Брэнд:" label-for="brand">
                <div class="input-catalog form-control d-flex justify-content-between" id="brand">
                  <div>
                  <a :href="'/catalog/brands/edit?id='+form.brand_arr.id">{{form.brand_arr.name}}</a>
                  </div>
                  <div>
                    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" @click="editProductBrands" ></i>
                  </div>
                </div>
              </b-form-group>

              <b-form-group id="input-group-categories" label="Категории:" label-for="categories">

                <div class="input-catalog form-control d-flex justify-content-between" id="categories">
                  <div>
                    <a v-for="item in form.categories_arr" :key="item.id" :href="'/catalog/category/edit?id='+item.id">{{item.name}}, </a>
                  </div>
                  <div>
                    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" @click="editProductCategories"></i>
                  </div>
                </div>

              </b-form-group>

              <b-form-group id="input-group-applicabilities" label="Применимости:" label-for="applicabilities">

                <div class="input-catalog form-control d-flex justify-content-between" id="applicabilities">
                  <div>
                    <a v-for="item in form.applicabilities_arr" :key="item.id" :href="'/catalog/applicabilities/edit?id='+item.id">{{item.name}}, </a>
                  </div>
                  <div>
                    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                  </div>
                </div>

              </b-form-group>

              <b-form-group id="input-group-article" label="Артикул:" label-for="article">
                <b-form-input id="article" v-model="form.article_origin" ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-productCardImages_main" label="Основное изображение:" label-for="productCardImages_main">
                <div class="input-catalog form-control d-flex justify-content-between" id="productCardImages_main">
                  <div>
                    <b-img fluid :src="form.productCardImages_main_url" />
                  </div>
                  <div>
                    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" ></i>
                  </div>
                </div>
              </b-form-group>

              <b-form-group id="input-group-prices" label="Цена:" label-for="prices">
                <b-form-input id="categories" v-model="form.prices_retail" ></b-form-input>
              </b-form-group>




              <b-button type="submit" variant="danger" class="">Удалить</b-button>
              <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
              <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>

              <catalogboxformeditor
                  :current-select-items=currentSelectItems
                  :items=dataSet
                  :type-multi-select=typeMultiSelect
                  v-on:changeitem="editItems($event)"
              />

            </b-form>
          </div>


        </div>

      </div>
      </div>

      <div class="col-4 ml-5">
      <div class="card" id="tblres" >
        <h4 class="card-header"> <small class="text-muted">Формализованный запрос</small></h4>
        <div class="card-body">
          <pre class="m-0 overflow-auto heigh-json">{{ form }}</pre>
        </div>
      </div>
      </div>

    </div>

  </div>

</template>

<script>

import catalogboxformeditor from '@/components/Products/ModalForm/CatalogBoxFormEditor'

export default {
name: "ProductsListFormEdit",
  props: ["query"],

  components: {
    catalogboxformeditor,
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
        productCardImages_main_url: '',
        prices_retail: '',
        product_timestampUpdated: '',
      },

      productsJson: {},
      show: true,
      dataSet: [],
      currentSelectItems: [],
      typeMultiSelect: false,
    }

  },
  methods:{


    editItems(item){
      this.form.brand_arr = item
      console.log(item)
    },

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
    async editProductBrands(){
      // Собираем данные
      await this.$store.dispatch("List/GetDataProductBrands");
      this.dataSet = await this.$store.getters["List/ProductBrands"];
      await this.$store.dispatch("List/GetDataProducts");
      let currentdata = await this.$store.getters["List/ProductItemById"](Number(this.query)) // лучше обновить так

      if (this.form.brand_arr.id !== currentdata.productCard.brand.id) {
        console.log('IF '+ this.form.brand_arr.id + ' !== '+currentdata.productCard.brand.id)
       this.currentSelectItems = this.form.brand_arr
      }
      else {
        this.currentSelectItems = currentdata.productCard.brand
      }

      //Открываем модалку
      this.typeMultiSelect = false
      await this.$bvModal.show('modal-catalog-edit')

    },

    async editProductCategories(){

      // Собираем данные
      await this.$store.dispatch("List/GetDataProductCategories");
      this.dataSet = await this.$store.getters["List/ProductCategories"];
      await this.$store.dispatch("List/GetDataProducts");
      let currentdata = await this.$store.getters["List/ProductItemById"](Number(this.query)) // лучше обновить так

      if (this.form.categories_arr.id !== currentdata.productCard.categories.id) {
      //  console.log('IF '+ this.form.brand_arr.id + ' !== '+currentdata.productCard.brand.id)
        this.currentSelectItems = this.form.categories_arr
      }
      else {
        this.currentSelectItems = currentdata.productCard.categories
      }

      //Открываем модалку
      this.typeMultiSelect = true
      await this.$bvModal.show('modal-catalog-edit')


    },


  },

 async mounted() {
    await this.$store.dispatch("List/GetDataProducts");
    this.productsJson = await this.$store.getters["List/ProductItemById"](Number(this.query))
    this.form.product_id = this.productsJson.productCard.id
    this.form.product_name= this.productsJson.productCard.name
    this.form.brand_arr= this.productsJson.productCard.brand
    this.form.categories_arr= this.productsJson.productCard.categories
    this.form.applicabilities_arr= this.productsJson.productCard.applicabilities
    this.form.article_origin= this.productsJson.productCard.sku.original
    this.form.productCardImages_main_url= this.productsJson.productCard.productCardImages.main.url
    this.form.prices_retail= this.productsJson.productOffer.prices.retail
    this.form.product_timestampUpdated= this.productsJson.productCard.timestampUpdated

  },

  computed:{

  },

}
</script>

<style scoped>


.input-catalog.form-control{
  height: auto !important;
  /*background-color: #e9ecef;*/
}
i {
  cursor: pointer;
  color: #047cff;
}
.heigh-json{
  height: 50em;
}

</style>
