export default {

    data() {
        return{
            initFailed: false,
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

                this.dataSet = this.$store.getters["CrmOrders/itemDetailsById"];

                console.log(this.dataSet.orderStatus)

                //
                this.$store.commit('BaseComponents/setValueInputIndex', {key: this.identifierComponents.input.id, value: this.dataSet.id})
                this.$store.commit('BaseComponents/setValueInputIndex', {key: this.identifierComponents.input.userId, value: this.dataSet.userId})
                this.$store.commit('BaseComponents/setValueInputText', {key: this.identifierComponents.input.userFirstName, value: this.dataSet.userName.firstName})
                this.$store.commit('BaseComponents/setValueInputText', {key: this.identifierComponents.input.userLastName, value: this.dataSet.userName.lastName})
                this.$store.commit('BaseComponents/setValueInputPhone', {key: this.identifierComponents.input.userPhone, value: this.dataSet.userPhone})
                this.$store.commit('BaseComponents/setValueInputPrice', {key: this.identifierComponents.input.orderPrice, value: this.dataSet.price})
                this.$store.commit('BaseComponents/setValueTextArea', {key: this.identifierComponents.input.commentsAdmin, value: this.dataSet.comments.admin})
                this.$store.commit('BaseComponents/setValueTextArea', {key: this.identifierComponents.input.commentsUser, value: this.dataSet.comments.user})
                this.$store.commit('BaseComponents/setDataTable', {key: this.identifierComponents.table.offers, value: this.dataSet.offers})

            }
            catch (err){
                console.error('Ошибка инициализации данных', err)
                this.initFailed = true;
            }
        },
    },
}