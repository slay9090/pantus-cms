export default {

    methods: {
       async dataInit () {
            /////////////////////////////////////////////////////
            await this.$store.dispatch("ProductParts/getDataAllParts");
            this.productsJson = await this.$store.getters["ProductParts/partsItemById"](Number(this.query))
            this.form.product_id = this.productsJson.productCard.id
            this.form.product_name = this.productsJson.productCard.name
            this.form.brand_arr = this.productsJson.productCard.brand
            this.form.categories_arr = this.productsJson.productCard.categories
            this.form.applicabilities_arr = this.productsJson.productCard.applicabilities
            this.form.article_origin = this.productsJson.productCard.sku.original
            this.form.prices_retail = this.productsJson.productOffer.prices.retail
            this.form.product_timestampUpdated = this.productsJson.productCard.timestampUpdated
            /////////////////////////////////////////////////////

            this.getImagesProduct(); // записываем картинки
            this.$store.commit('ProductParts/setDataSelectedImages', this.form.productCardImages)

           await this.$store.dispatch('CatalogBrands/getDataAllItems')
           await this.$store.dispatch('CatalogCategories/getDataAllItems')
           await this.$store.dispatch('CatalogApplicabilities/getDataAllItems')

            this.$store.commit("ProductParts/setDataCurrentCategoriesByPart", this.productsJson.productCard.categories) // подгружаем текущие категории товара
            this.$store.commit("ProductParts/setDataCurrentBrandsByPart", this.productsJson.productCard.brand) // подгружаем текущие Бренды товара
            this.$store.commit("ProductParts/setDataCurrentApplicabilitiesByPart", this.productsJson.productCard.applicabilities) // подгружаем текущие Применимости товара


            /// вынессти в выч. св-ва
            this.allItemsCatalogBrands =  this.$store.getters["CatalogBrands/allItems"] // neeed
            this.allItemsCatalogCategories =  this.$store.getters["CatalogCategories/allItems"]
            this.allItemsCatalogApplicabilities =  this.$store.getters["CatalogApplicabilities/allItems"]


           await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
                {
                    'key': 'product-part-brand-edit',
                    'value': this.$store.getters["ProductParts/currentBrandByPart"]
                })


           await  this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
                    {
                        'key': 'product-part-categories-edit',
                        'value': this.$store.getters["ProductParts/currentCategoriesByPart"]
                    })

           await  this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
               {
                   'key': 'product-part-applicabilities-edit',
                   'value': this.$store.getters["ProductParts/currentApplicabilitiesByPart"]
               })

        },


        /// Получаем изображения товара при загрузке формы
        getImagesProduct(){
            /// если нет мейн имг, то не читаем альбум имг
            if (this.productsJson.productCard.productCardImages.main.url!== undefined && this.productsJson.productCard.productCardImages.main.url!==null){
                this.form.productCardImages.push(this.productsJson.productCard.productCardImages.main.url) // записываем первое имг

                this.productsJson.productCard.productCardImages.album.forEach(element => {
                    if (element.url!== undefined && element.url!== null) {
                        this.form.productCardImages.push(element.url) // записываем все остальные в альбомах
                    }
                });
            }

            let img = this.form.productCardImages
            this.$store.commit('ProductParts/setDataCurrentImages', img)
        },

    },
}