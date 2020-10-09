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
                    <a v-for="(item, index) in selectedBrand" :key="index" :href="'/catalog/brand/edit?id='+item.id">{{item.name}} </a>
                  </div>
                  <div>
                    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" @click="editProductBrands" ></i>
                  </div>
                </div>
              </b-form-group>

              <b-form-group id="input-group-categories" label="Категории:" label-for="categories">

                <div class="input-catalog form-control d-flex justify-content-between" id="categories">
                  <div>
                    <a v-for="item in selectedCategories" :key="item.id" :href="'/catalog/category/edit?id='+item.id">{{item.name}}, </a>
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





                  <div class="d-flex flex-column justify-content-center " >
                    <div class=""> <i class="fa fa-chevron-left fa-2x" aria-hidden="true" @click="prevSlide" ></i> </div>
                  </div>



                  <div class="mx-3 " style="  width: 100%; ">
                    <b-carousel
                        id="carousel-1"
                        v-model="slide"
                        :interval=0
                        indicators
                        style="text-shadow: 1px 1px 2px #333;
                        text-align: center;
                        height: 400px;
                        display: flex;
                        align-items: center;
                        justify-content: center;"
                        no-animation
                        ref="myCarousel"
                    >



                      <b-carousel-slide v-for="(item, index) in selectedImages" :key="index" >

                        <template v-slot:img>

                          <div v-if="!imgIsNotExist" class="overlay"> <i class="fa fa-check-square icon-bookmark"  ></i> </div>

                          <img v-if="index===0"
                              style="max-height: 400px "
                              class="w-100"
                              :src=item
                              alt="main image"
                              @error="hasImgError()"
                          >

                          <img v-else
                               style="max-height: 400px "
                               class="w-100"
                               :src=item
                               alt="album image"
                          >

                        </template>

                      </b-carousel-slide>
                    </b-carousel>


                  </div>

                  <div class="d-flex flex-column justify-content-center ">

                   <div class=""> <i class="fa fa-chevron-right fa-2x" aria-hidden="true" @click="nextSlide" ></i> </div>

                  </div>
                  <div class="d-flex flex-column ">

                    <div class=""> <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" @click="imageUpload" ></i> </div>

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
                  :items=dataSet
                  :type-content= typeContent
                  v-on:changeitem="editItems($event)"
              />

              <imageuploader />

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

import catalogboxformeditor from '@/components/Products/ModalForm/ModalBoxEditor'
import imageuploader from '@/components/FileLoader/ModalWindowUpLoader'

export default {
name: "ProductsListFormEdit",
  props: ["query"],

  components: {
    catalogboxformeditor,
    imageuploader,
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
      dataSet: [],
      typeContent: '',
      slide: 0,
      sliding: null,
      imgIsNotExist: false,

    }

  },
  methods:{

    hasImgError(){

      this.imgIsNotExist = true
    },

    nextSlide() {
      this.$refs.myCarousel.next()
    },
    prevSlide(){
      this.$refs.myCarousel.prev()
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
      await this.$store.dispatch("CatalogBrands/getDataAllItems");
      this.dataSet = await this.$store.getters["CatalogBrands/allItems"];
      //Открываем модалку
      this.typeContent = 'Brand'
      await this.$bvModal.show('modal-catalog-edit')
    },

    async editProductCategories(){

      // Собираем данные
      await this.$store.dispatch("CatalogCategories/getDataAllItems");
      this.dataSet = await this.$store.getters["CatalogCategories/allItems"];
      //Открываем модалку
      this.typeContent = 'Categories'
      this.$store.commit('ProductParts/clearDataParentsSelectedNodes')
      this.$store.commit('ProductParts/setDataParentsSelectedNodes', this.getAllParentsForAllSelectedNodes())
      await this.$bvModal.show('modal-catalog-edit')

    },


    imageUpload(){
      this.$bvModal.show('modal-file-uploader')
    },

    ///НАЧАЛО ПОЛУЧАЕМ И ФОРМИРУЕМ ПУТЬ ДО ВЫБРАННЫХ УЗЛОВ
    getAllParentsForAllSelectedNodes(){
      let parent= []
        this.selectedCategories.forEach(element => {
          parent.push(this.getAllParentForOneNode(this.dataSet, element.id))
        })

      return parent
    },
    getAllParentForOneNode(dataset, nodeId)
    {
      let parents = []
      var TreeModel = require('tree-model'),
          tree = new TreeModel();
      dataset.forEach(element => {
        let rootMain = tree.parse(element);
        rootMain.walk(function (node) {
          if (node.model.id === nodeId) {
            let x = node.getPath()
            x.forEach(element => {
              parents.push(element.model.id)

            })}})})

      return parents
    },
    ///КОНЕЦ ПОЛУЧАЕМ И ФОРМИРУЕМ ПУТЬ ДО ВЫБРАННЫХ УЗЛОВ

    /// Получаем изображения товара при загрузке формы
    getImagesProduct(){
      /// если нет мейн имг, то не читаем альбум имг
      if (this.productsJson.productCard.productCardImages.main.url!== undefined && this.productsJson.productCard.productCardImages.main.url!==null){
        this.form.productCardImages.push(this.productsJson.productCard.productCardImages.main.url)

        this.productsJson.productCard.productCardImages.album.forEach(element => {
          if (element.url!== undefined && element.url!== null) {
            this.form.productCardImages.push(element.url)
          }
        });

      }


    },

  },



  async mounted() {

    await this.$store.dispatch("ProductParts/getDataAllParts");
    this.productsJson = await this.$store.getters["ProductParts/partsItemById"](Number(this.query))

    this.$store.commit("ProductParts/setDataCurrentCategoriesByPart", this.productsJson.productCard.categories) // подгружаем текущие категории товара
    this.$store.commit("ProductParts/setDataCurrentBrandsByPart", this.productsJson.productCard.brand) // подгружаем текущие Бренды товара
    this.$store.commit("ProductParts/setDataCurrentApplicabilitiesByPart", this.productsJson.productCard.applicabilities) // подгружаем текущие Применимости товара

    this.$store.commit("ProductParts/clearItemSelectedBrands")
    this.$store.commit("ProductParts/addItemSelectedBrands", this.productsJson.productCard.brand);

    this.$store.commit("ProductParts/clearItemSelectedCategories")
    this.productsJson.productCard.categories.forEach(element => this.$store.commit("ProductParts/addItemSelectedCategories", element));
    this.getImagesProduct();

    this.form.product_id = this.productsJson.productCard.id
    this.form.product_name= this.productsJson.productCard.name
    this.form.brand_arr= this.productsJson.productCard.brand
    this.form.categories_arr= this.productsJson.productCard.categories
    this.form.applicabilities_arr= this.productsJson.productCard.applicabilities
    this.form.article_origin= this.productsJson.productCard.sku.original


    this.$store.commit('ProductParts/setDataSelectedImages', this.form.productCardImages)

    console.log(this.$store.getters['ProductParts/selectedImages'])


    this.form.prices_retail= this.productsJson.productOffer.prices.retail
    this.form.product_timestampUpdated= this.productsJson.productCard.timestampUpdated


  },

  computed:{


    selectedImages(){
      //let arr = []
      if (this.$store.getters["ProductParts/selectedImages"][0]) {
        return this.$store.getters["ProductParts/selectedImages"]
      }
      else {
        return new Array('https://www.pantus.ru/images_uploader/images/no-image2.png')
      }
    },


    selectedBrand(){
      return this.$store.getters["ProductParts/selectedBrands"]
    },

    selectedCategories(){
      return  this.$store.getters["ProductParts/selectedCategories"]
    },

  },

}
</script>

<style scoped>

.overlay {
  position: absolute;
  top: 1%;
  left: 1%;
  width: 10%;
  height: auto;
  text-align: left;
}

.input-catalog.form-control{
  height: auto !important;
  /*background-color: #e9ecef;*/
}

.icon-bookmark {
  cursor: default;
  color: lightgray;
  opacity: 0.5;
  font-size: 2em;
}

i {
  cursor: pointer;
  color: #047cff;
}
.heigh-json{
  height: 50em;
}

</style>
