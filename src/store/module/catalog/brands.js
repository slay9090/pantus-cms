import Axios from 'axios'
const jsonMaps = require ("@/store/json-config"); // json data-maps


const state = () => ({
    all_items: [],
    details_item: {}

})

const mutations = {
    /**
     * ###ЗАПИСАТЬ ВСЕ БРЕНДЫ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     */
    setDataAllItems(state ,data){
        state.all_items = data;
    },

    setDataDetailsItem(state ,data){
        state.details_item = data;
    },
}

const actions = {

    /**
     * ###ПОЛУЧИТЬ ВСЕ БРЕНДЫ С БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getDataAllItems({commit}){

        return  await Axios.get(process.env.VUE_APP_API_URL_CATALOG_BRANDS).then( res =>{
            commit("setDataAllItems", jsonMaps.catalogBrandsList(res.data) );
        })
    },

    async getDataDetailsItem({commit}, id){

        return  await Axios.get(`${process.env.VUE_APP_API_URL_CATALOG_BRANDS}/${id}`).then( res =>{

            commit("setDataDetailsItem", jsonMaps.catalogBrandDetail(res.data) );
        })
    },
}

const getters = {
    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ БРЕНДЫ
     * @param arr
     * @returns {[]}
     */
    allItems: state => state.all_items,

    detailsItem: state => state.details_item,



}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
