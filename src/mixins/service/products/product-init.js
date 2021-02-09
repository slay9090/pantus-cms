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

               this.$store.commit('BaseComponents/setValueInputIndex', {key: this.identifierComponents.input.id, value: this.productsJson.id})
               this.$store.commit('BaseComponents/setValueInputText', {key: this.identifierComponents.input.name, value: this.productsJson.name})
               this.$store.commit('BaseComponents/setValueInputVendorCode', {key: this.identifierComponents.input.sku, value: this.productsJson.sku.origin})
               this.activity = !this.productsJson.activity


               this.getImagesProduct(); // записываем картинки
               this.getOffersProduct(); // оферы

               this.$store.commit('NewFileManager/setDataCurrentFiles', {key: this.identifierComponents.input.imageManagerId, value: this.getImagesProduct()})

               await this.$store.dispatch('CatalogBrands/getDataAllItems')
               await this.$store.dispatch('CatalogCategories/getDataAllItems')
               await this.$store.dispatch('CatalogApplicabilities/getDataAllItems')

               await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
                   {
                       'key': this.identifierComponents.input.brand,
                       'value': this.productsJson.brand
                   })



               await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
                   {
                       'key': this.identifierComponents.input.categories,
                       'value': this.productsJson.categories
                   })

               await this.$store.dispatch('TempDataCatalog/loadValueInputCatalog',
                   {
                       'key': this.identifierComponents.input.applicabilities,
                       'value': this.productsJson.applicabilities
                   })

               // this.$store.commit('BaseComponents/setDataLimitTable', {
               //     'key': this.identifierComponents.table.offers,
               //     'value': this.productsJson.offers
               // });

               /// вынессти в выч. св-ва
               this.allItemsCatalogBrands = this.$store.getters["CatalogBrands/allItems"] // neeed
               this.allItemsCatalogCategories = this.$store.getters["CatalogCategories/allItems"]
               this.allItemsCatalogApplicabilities = this.$store.getters["CatalogApplicabilities/allItems"]






           }
           catch (err){
               console.error('Ошибка инициализации данных', err)
               this.initFailed = true;
           }

        },


        /// Получаем изображения товара при загрузке формы отрефактор нид
        getImagesProduct(){

           let img = []
            /// если нет мейн имг, то не читаем альбум имг
            if (this.productsJson.images.main.url!== undefined && this.productsJson.images.main.url!==null){
                img.push(this.productsJson.images.main.url) // записываем первое имг

                this.productsJson.images.album.url.forEach(element => {
                    if (element!== undefined && element!== null) {
                        img.push(element) // записываем все остальные в альбомах
                    }
                });
            }


            return img;
           // this.$store.commit('NewFileManager/setDataCurrentFiles', {})

            //this.$store.commit('ProductParts/setDataCurrentImages', this.form.images)
        },

        getOffersProduct(){



           let offers = [];
            if (this.productsJson.offers.length > 0) {
                this.productsJson.offers.forEach(elem => {
                    elem.measure = this.productsJson.params.measure
                    offers.push(elem)

                })
                console.log('off', offers   )
                this.$store.commit('BaseComponents/setDataTable', {key: this.identifierComponents.table.offers, value: offers})
            }


        }

    },
}