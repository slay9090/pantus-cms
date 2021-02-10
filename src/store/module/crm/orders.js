import Axios from 'axios'
import {baseFunc as $globalFunc} from "@/mixins/global";
const jsonMaps = require ("@/store/json-config"); // json data-maps



const state = () => ({
    all_items: [],
    item_details_by_id: {},
    all_statuses: {},
    all_delivery_service: {},
    all_payment_systems: {},
    tree_conformity: {},

})

const mutations = {
    setDataAllItems(state ,data){
        state.all_items = data;
    },
    setDataDetailsItemById(state ,data){
        state.item_details_by_id = data;
    },

    setDataStatuses(state ,data){
        state.all_statuses = data;
    },

    setDataDeliveryService(state ,data){
        state.all_delivery_service = data;
    },

    setDataPaymentSystems(state ,data){
    state. all_payment_systems = data;
    },

    setTreeConformity(state ,data){
        state.tree_conformity = data;
    }



}

const actions = {



    async getDataAllItems({commit},  urlParams){
        const formattedUrl = jsonMaps.crmOrdersMapedUrlFilter(urlParams)
        Axios.all([
            Axios.get(process.env.VUE_APP_API_URL_CRM_ORDERS,
                {
                    params: {
                        ...formattedUrl
                    }
                }
            ),
            Axios.get(process.env.VUE_APP_API_URL_CRM_ORDERS+'/count')
        ])
            .then(Axios.spread(function (items, count) {
                let data = { data: [], meta: []}
                data.data = items.data
                data.meta.count = count.data
                commit("setDataAllItems", jsonMaps.crmOrdersMapedList(data));
            }))
            .catch(function (error) {
                console.error(error)
            });

    },

    async getDetailsById({commit}, id){
        //https://api.pantus.ru/orders/88
        return  await Axios.get(process.env.VUE_APP_API_URL_CRM_ORDERS+'/'+id).then( res =>{
            commit("setDataDetailsItemById", jsonMaps.crmOrderDetail(res.data) );
        })
    },

    //http://api.pantus.ru/orders/statuses
    async getOrderStatuses({commit}){
        //https://api.pantus.ru/orders/88
        return  await Axios.get(process.env.VUE_APP_API_URL_CRM_ORDERS+'/statuses').then( res =>{
            commit("setDataStatuses", jsonMaps.crmOrderStatuses(res.data) );
        })
    },

    async getOrderDeliveryService({commit}){
        //http://api.pantus.ru/orders/delivery_services
        return  await Axios.get(process.env.VUE_APP_API_URL_CRM_ORDERS+'/delivery_services').then( res =>{
            commit("setDataDeliveryService", jsonMaps.crmOrderDeliveryServises(res.data) );
        })
    },

    async getOrderPaySystems({commit}){
        //http://api.pantus.ru/orders/payment_services
        return  await Axios.get(process.env.VUE_APP_API_URL_CRM_ORDERS+'/payment_services').then( res =>{
            commit("setDataPaymentSystems", jsonMaps.crmOrderPaySystems(res.data) );
        })
    },

    //conformity
    async getTreeConformity({commit}){
        //http://api.pantus.ru/orders/payment_services
        return  await Axios.get(process.env.VUE_APP_API_URL_CRM_ORDERS+'/user_to_delivery_to_paysystem_map').then( res =>{
            commit("setTreeConformity", jsonMaps.crmOrderTreeConformity(res.data) );
        })
    },

    async sendFormOrder({getters} , id){
        // console.log(jsonMaps.crmOrderFormDataForSend(getters.itemDetailsById))
        await Axios.patch(process.env.VUE_APP_API_URL_CRM_ORDERS+`/${id}`,
            jsonMaps.crmOrderFormDataForSend(getters.itemDetailsById),
            {}
        ).then( res =>{
            console.log(res.data)
            if(res.data.success){$globalFunc.setAlertMessage('success', 'Запрос выполнен успешно');}
            if(res.data.error){$globalFunc.setAlertMessage('danger', `Запрос не выполнен, ошибка: ${res.data.error.description}`);}

        }).catch(function (error) {
            console.error(error)
            $globalFunc.setAlertMessage('danger', `Запрос не выполнен, ошибка: ${error}`);
        });
    },

}

const getters = {
    //получить весь массив
    allItems: state => state.all_items,

    itemDetailsById: state => state.item_details_by_id,

    statuses: state => state.all_statuses,

    deliveryServices: state => state.all_delivery_service,

    paymentSystems: state => state.all_payment_systems,

    tree_conformity: state => state.tree_conformity,

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
