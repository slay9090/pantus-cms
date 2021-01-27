export default {

    data() {
        return{
            initFailed: false
        }
    },

    methods: {
        dataInit () {

            try {
                 this.$store.dispatch('CrmOrders/getDataAllItems',  this.$route.query)
            }
            catch (err){
                console.error('Ошибка инициализации данных', err)
                this.initFailed = true;
            }
        },
    },
}