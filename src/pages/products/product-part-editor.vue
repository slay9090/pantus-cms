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

              <b-form-group id="input-group-brand" label="Брэнд:" label-for="product-part-brand-edit">
                <input-catalog
                    v-if="allItemsCatalogBrands"
                    id="product-part-brand-edit"
                    type-catalog="singleSelect"
                    :items="allItemsCatalogBrands"
                >
                  <router-link v-if="currentItemBrandInput" :to="'/catalog/brands/edit?id='+currentItemBrandInput.id">
                    {{ currentItemBrandInput.name }}
                  </router-link>
                </input-catalog>
              </b-form-group>



              <b-form-group id="input-group-categories" label="Категории:" label-for="product-part-categories-edit">
                <input-catalog
                    v-if="allItemsCatalogCategories"
                    id="product-part-categories-edit"
                    type-catalog="multiSelectTree"
                    :items="allItemsCatalogCategories"
                >
                  <router-link v-for="item in currentItemsCategoriesInput" :key="item.id"
                               :to="'/catalog/category/edit?id='+item.id">
                                      {{ item.name }},
                  </router-link>
                </input-catalog>
              </b-form-group>


<!--              <b-form-group id="input-group-applicabilities" label="Применимости:" label-for="product-part-applicabilities-edit">-->
<!--                <input-catalog-->
<!--                    v-if="allItemsCatalogApplicabilities"-->
<!--                    id="product-part-applicabilities-edit"-->
<!--                    type-catalog="multiSelectTree"-->
<!--                    :items="allItemsCatalogApplicabilities"-->
<!--                >-->
<!--                  <router-link v-for="item in currentItemsApplicabilitiesInput" :key="item.id"-->
<!--                               :to="'/catalog/category/edit?id='+item.id">-->
<!--                    {{ item.name }},-->
<!--                  </router-link>-->
<!--                </input-catalog>-->
<!--              </b-form-group>-->


              <b-form-group id="input-group-article" label="Артикул:" label-for="article">
                <b-form-input id="article" v-model="form.article_origin" ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-productCardImages_main" label="Изображения:" label-for="productCardImages_main">
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

                          <div v-if="!imgIsNotExist && index===0" class="overlay"> <i class="fa fa-check-square icon-bookmark"  ></i> </div>

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

import imageuploader from '@/components/file-manager/fIle-manager'
import InputCatalog from "@/components/catalog/input-catalog";
import init from '@/mixins/forms/products/product-init'

export default {
name: "ProductsListFormEdit",
  props: ["query"],
  mixins:[init,],
  components: {
    InputCatalog,
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
      slide: 0,
      sliding: null,
      imgIsNotExist: false,
      allItemsCatalogBrands: null,
      allItemsCatalogCategories: null,
      allItemsCatalogApplicabilities: null,

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

    imageUpload(){
      this.$bvModal.show('modal-file-uploader')
    },

  },
  async created(){
    await this.dataInit();
  },
  async mounted() {

  },

  computed:{
    selectedImages(){
      if (this.$store.getters["ProductParts/selectedImages"][0]) {
        return this.$store.getters["ProductParts/selectedImages"]
      }
      else {
        return new Array('https://www.pantus.ru/images_uploader/images/no-image2.png')
      }
    },

    currentItemBrandInput() {
      return this.$store.getters["TempDataCatalog/getValueInputCatalog"]('product-part-brand-edit')
    },

    currentItemsCategoriesInput(){
      return this.$store.getters["TempDataCatalog/getValueInputCatalog"]('product-part-categories-edit')
    },

    currentItemsApplicabilitiesInput(){
      return this.$store.getters["TempDataCatalog/getValueInputCatalog"]('product-part-applicabilities-edit')
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
  color: #007bff;
  opacity: 0.6;

}

i:hover{
  opacity: 1;
}

.heigh-json{
  height: 50em;
}

</style>
