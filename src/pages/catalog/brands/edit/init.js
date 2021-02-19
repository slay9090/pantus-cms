export default {

    data() {
        return{
            initFailed: true,
        }
    },

    methods: {
        async dataInit () {
            this.initFailed = true
            try {

               await this.$store.dispatch('CatalogBrands/getDataDetailsItem', this.$route.params.id)
                this.initBrandCode = this.formData.code
                this.initBrandName = this.formData.name

                this.initFailed = false
            }
            catch (err){
                console.error('Ошибка инициализации данных', err)
                this.initFailed = true;
            }
        },
    },
}