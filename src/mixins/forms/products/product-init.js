export default {

    data() {
        return{
            initFailed: false
        }
    },

    methods: {
       async dataInit () {

           try {
               /////////////////////////////////////////////////////
               await this.$store.dispatch("ProductParts/dataDetailPartsById", this.query);
               this.productsJson = await this.$store.getters["ProductParts/getDetailPartsById"](null).data[0]
               console.log(this.productsJson)
               this.form.product_id = this.productsJson.id
               this.form.product_name = this.productsJson.name
               this.form.brand_arr = this.productsJson.brand
               this.form.categories_arr = this.productsJson.categories
               this.form.applicabilities_arr = this.productsJson.applicabilities
               this.form.article_origin = this.productsJson.sku.original
               //this.form.offers = this.productsJson.offers
               this.form.product_timestampUpdated = this.productsJson.dates
               this.form.params = this.productsJson.params

               if (this.productsJson.offers.length > 0) {
                   this.productsJson.offers.forEach(elem => {
                       elem.measure = this.productsJson.params.measure
                       this.form.offers.push(elem)
                   })
               }

               /////////////////////////////////////////////////////

               this.getImagesProduct(); // записываем картинки
               this.$store.commit('ProductParts/setDataSelectedImages', this.form.images)

               await this.$store.dispatch('CatalogBrands/getDataAllItems')
               await this.$store.dispatch('CatalogCategories/getDataAllItems')
               await this.$store.dispatch('CatalogApplicabilities/getDataAllItems')

               this.$store.commit("ProductParts/setDataCurrentCategoriesByPart", this.productsJson.categories) // подгружаем текущие категории товара
               this.$store.commit("ProductParts/setDataCurrentBrandsByPart", this.productsJson.brand) // подгружаем текущие Бренды товара
               this.$store.commit("ProductParts/setDataCurrentApplicabilitiesByPart", this.productsJson.applicabilities) // подгружаем текущие Применимости товара


               /// вынессти в выч. св-ва
               this.allItemsCatalogBrands = this.$store.getters["CatalogBrands/allItems"] // neeed
               this.allItemsCatalogCategories = this.$store.getters["CatalogCategories/allItems"]
               this.allItemsCatalogApplicabilities = this.$store.getters["CatalogApplicabilities/allItems"]


               await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
                   {
                       'key': this.identifierComponents.input.brand,
                       'value': this.$store.getters["ProductParts/currentBrandByPart"]
                   })


               await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
                   {
                       'key': this.identifierComponents.input.categories,
                       'value': this.$store.getters["ProductParts/currentCategoriesByPart"]
                   })

               await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
                   {
                       'key': this.identifierComponents.input.applicabilities,
                       'value': this.$store.getters["ProductParts/currentApplicabilitiesByPart"]
                   })

               this.$store.commit('BaseComponents/setDataLimitTable', {
                   'key': this.identifierComponents.table.offers,
                   'value': this.form.offers
               });


           }
           catch (err){
               console.error('Ошибка инициализации данных')
               this.initFailed = true;
           }

        },


        /// Получаем изображения товара при загрузке формы
        getImagesProduct(){
            /// если нет мейн имг, то не читаем альбум имг
            if (this.productsJson.images.main.url!== undefined && this.productsJson.images.main.url!==null){
                this.form.images.push(this.productsJson.images.main.url) // записываем первое имг

                this.productsJson.images.album.url.forEach(element => {
                    if (element!== undefined && element!== null) {
                        this.form.images.push(element) // записываем все остальные в альбомах
                    }
                });
            }

            this.$store.commit('ProductParts/setDataCurrentImages', this.form.images)
        },

    },
}