export default {

    data() {
        return{
            initFailed: true,
            identifierComponents: {
                input: {
                    id: 'orders-edit-id',
                    userId: 'orders-edit-userId',
                    userFirstName: 'orders-edit-userFirstName',
                    userLastName:'orders-edit-userLastName',
                    userPhone: 'orders-edit-userPhone',
                    orderPrice: 'orders-edit-orderPrice',
                    deliveryPrice: 'orders-edit-deliveryPrice',
                    trackingCode: 'orders-edit-trackingCode',
                    deliveryCity: 'orders-edit-deliveryCity',
                    deliveryDetailed: 'orders-edit-deliveryDetailed',
                    commentsAdmin: 'orders-edit-commentsAdmin',
                    commentsUser: 'orders-edit-commentsUser',
                    datesCreated: 'orders-edit-datesCreated',
                    datesModified: 'orders-edit-datesModified',
                    datesStatusUpdate: 'orders-edit-datesStatusUpdate',

                },
                radioButtonsGroup:{
                    deliveryAllow: 'orders-edit-deliveryAllow',
                },

                table: {
                    offers: 'orders-edit-offers',
                },
                formSelect: {
                    status: 'orders-edit-status'
                },
            },
        }
    },

    methods: {
       async dataInit () {

            try {
               await this.$store.dispatch('CrmOrders/getDetailsById', this.$route.params.id);
               await this.$store.dispatch('CrmOrders/getOrderStatuses');
               await this.$store.dispatch('CrmOrders/getOrderDeliveryService')
               await this.$store.dispatch('CrmOrders/getOrderPaySystems')
                await this.$store.dispatch('CrmOrders/getTreeConformity')

                this.$store.commit('BaseComponents/setDataTable', {key: this.identifierComponents.table.offers, value: this.orderDetail.offers})
                this.initFailed = false
            }
            catch (err){
                console.error('Ошибка инициализации данных', err)
                this.initFailed = true;
            }
        },
    },
}