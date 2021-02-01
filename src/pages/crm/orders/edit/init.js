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
            },
        }
    },

    methods: {
       async dataInit () {

            try {
               await this.$store.dispatch('CrmOrders/getDetailsById', this.$route.params.id);
                const data = this.$store.getters["CrmOrders/itemDetailsById"];
            //
                this.$store.commit('BaseComponents/setValueInputIndex', {key: this.identifierComponents.input.id, value: data.id})
                this.$store.commit('BaseComponents/setValueInputIndex', {key: this.identifierComponents.input.userId, value: data.userId})
                this.$store.commit('BaseComponents/setValueInputText', {key: this.identifierComponents.input.userFirstName, value: data.userName.firstName})
                this.$store.commit('BaseComponents/setValueInputText', {key: this.identifierComponents.input.userLastName, value: data.userName.lastName})
                this.$store.commit('BaseComponents/setValueInputPhone', {key: this.identifierComponents.input.userPhone, value: data.userPhone})
                this.$store.commit('BaseComponents/setValueInputPrice', {key: this.identifierComponents.input.orderPrice, value: data.price})
                this.$store.commit('BaseComponents/setValueTextArea', {key: this.identifierComponents.input.commentsAdmin, value: data.comments.admin})
                this.$store.commit('BaseComponents/setValueTextArea', {key: this.identifierComponents.input.commentsUser, value: data.comments.user})

            }
            catch (err){
                console.error('Ошибка инициализации данных', err)
                this.initFailed = true;
            }
        },
    },
}