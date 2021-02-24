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

        let fetchSummoner = async() => {

            const brandDetail = await Axios.get(`${process.env.VUE_APP_API_URL_CATALOG_BRANDS}/${id}`);
            const descriptonDetail = brandDetail.data.description_id !== null ?
                await Axios.get(`${process.env.VUE_APP_API_URL_CATALOG_BRANDS}/descriptions/${brandDetail.data.description_id}`) :
                null
            const summoner = brandDetail.data;
            summoner.description = descriptonDetail !== null ?  descriptonDetail.data : null;
            return summoner;
        }
        // console.log(await fetchSummoner())
        commit("setDataDetailsItem", jsonMaps.catalogBrandDetail( await fetchSummoner()));

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
