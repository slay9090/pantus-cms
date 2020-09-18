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
                    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                  </div>
                </div>
              </b-form-group>

              <b-form-group id="input-group-categories" label="Категории:" label-for="categories">

                <div class="input-catalog form-control d-flex justify-content-between" id="categories">
                  <div>
                    <a v-for="item in form.categories_arr" :key="item.id" :href="'/catalog/category/edit?id='+item.id">{{item.name}}, </a>
                  </div>
                  <div>
                    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" ></i>
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

<!--              <b-form-group id="input-group-product_timestampUpdated" label="Дата изменения:" label-for="product_timestampUpdated">-->
<!--                <b-form-input id="product_timestampUpdated" v-model="form.product_timestampUpdated" ></b-form-input>-->
<!--              </b-form-group>-->


              <b-button type="submit" variant="danger" class="">Удалить</b-button>
              <b-button type="reset" variant="secondary" class="mx-2">Сбросить</b-button>
              <b-button type="submit" variant="primary" class="pull-right">Сохранить</b-button>


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
export default {
name: "ProductsListFormEdit",
  props: ["query"],

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


      productsJson:
            {
              "productCard": {
                "id": 1,
                "bitrixId": 1,
                "active": true,
                "name": "Шланг-ф45-3",
                "sku": {
                  "original": "2170-5206064AD",
                  "normalized": null
                },
                "brand": {
                  "id": 12,
                  "bitrixId": 12,
                  "active": null,
                  "name": "РЕЗИНОТЕХНИКА",
                  "code": "REZINOTEHNIKA",
                  "timestampCreated": null,
                  "timestampUpdated": null
                },
                "categories": [
                  {
                    "id": 5096,
                    "parentId": 5097,
                    "code": null,
                    "name": "Прокладки и крышки",
                    "lft": null,
                    "rght": null,
                    "treeId": null,
                    "level": null,
                    "children": null
                  },
                  {
                    "id": 50961,
                    "parentId": 50971,
                    "code": null,
                    "name": "Пранк",
                    "lft": null,
                    "rght": null,
                    "treeId": null,
                    "level": null,
                    "children": null
                  }
                ],
                "applicabilities": [
                  {
                    "id": 4820,
                    "parentId": 4819,
                    "code": null,
                    "name": "Almera",
                    "description": null,
                    "lft": null,
                    "rght": null,
                    "treeId": null,
                    "level": null,
                    "children": null
                  },
                  {
                    "id": 48201,
                    "parentId": 48191,
                    "code": null,
                    "name": "BMW",
                    "description": null,
                    "lft": null,
                    "rght": null,
                    "treeId": null,
                    "level": null,
                    "children": null
                  },
                ],
                "productCardImages": {
                  "main": {
                    "id": 482,
                    "active": null,
                    "name": "img",
                    "slug": null,
                    "hash": null,
                    "url": "http://www.pantus.ru/upload/iblock/042/10034697ASP%20-%20Прокладка%20бензонасоса%20ВАЗ%2021082%20силикон%20синий%20-%20A-Sport.jpg",
                    "timestampCreated": null,
                    "productCardId": null,
                    "main": null
                  },
                  "album": [
                    {
                      "id": 344,
                      "active": null,
                      "name": "kinnn",
                      "slug": null,
                      "hash": null,
                      "url": "http://www.pantus.ru/upload/iblock/eca/00034867ALT%20-%20Патрубки%20печки%20ВАЗ%201118%20-%20Ассоциация%20Балаковских%20Производителей%20Автозапчастей.jpg",
                      "timestampCreated": null,
                      "productCardId": null,
                      "main": null
                    },
                    {
                      "id": 344,
                      "active": null,
                      "name": "kinnn",
                      "slug": null,
                      "hash": null,
                      "url": "http://www.pantus.ru/upload/iblock/eca/00034867ALT%20-%20Патрубки%20печки%20ВАЗ%201118%20-%20Ассоциация%20Балаковских%20Производителей%20Автозапчастей.jpg",
                      "timestampCreated": null,
                      "productCardId": null,
                      "main": null
                    }
                  ]
                },
                "productCardMeasures": {
                  "length": null,
                  "width": null,
                  "height": null,
                  "weight": null
                },
                "productCardOems": [
                  {
                    "manufacturerOems": [
                      ""
                    ],
                    "foreignOems": [
                      ""
                    ]
                  }
                ],
                "timestampCreated": null,
                "timestampUpdated": "09.12.2015 14:50:25"
              },
              "productOffer": {
                "id": null,
                "bitrixId": null,
                "active": null,
                "productCardId": null,
                "bitrixProductCardId": null,
                "guid": null,
                "nomenclatureCode": null,
                "quantity": null,
                "multiplicity": null,
                "pantusDepartment": {
                  "id": null,
                  "name": null
                },
                "supplier": {
                  "id": null,
                  "nomenclatureCode": null,
                  "code": null,
                  "name": null,
                  "deliveryDelay": null
                },
                "prices": {
                  "wholesale": null,
                  "retail": 99.99,
                  "brt1": null,
                  "brt2": null,
                  "brt3": null,
                  "brt4": null,
                  "brt5": null,
                  "brt6": null,
                  "brt75": null,
                  "brt10": null
                },
                "timestampCreated": null,
                "timestampUpdated": null
              }
            },

      show: true,
      xxx:'xxx'




    }

  },

  methods:{

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
    console.log(this.productsJson)
    this.form.product_id = this.productsJson.productCard.id
    this.form.product_name= this.productsJson.productCard.name
   // this.form.brand_arr= `[${this.productsJson.productCard.brand.id}] ${this.productsJson.productCard.brand.name}`
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
/*a {*/
/*  color: #047cfe !important;*/
/*}*/

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
