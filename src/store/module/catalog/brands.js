import Axios from 'axios'
const jsonMaps = require ("@/store/json-config"); // json data-maps


const state = () => ({
    all_items_brands: [],

})

const mutations = {
    /**
     * ###ЗАПИСАТЬ ВСЕ БРЕНДЫ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     */
    setDataAllBrands(state ,data){
        state.all_items_brands = data;
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
            commit("setDataAllBrands", jsonMaps.catalogBrandsList(res.data) );


        })
    },
}

const getters = {
    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ БРЕНДЫ
     * @param arr
     * @returns {[]}
     */
    allItems: arr => arr.all_items_brands,

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЮ ИНФОРМАЦИЮ ОБ ЭТОМ БРЕНДЕ ПО ИД
     * @param arr
     * @returns {function(*): *}
     * @summary `await this.$store.getters["имяМодуля/имяГетера"](Аргументы)`
     */
    itemById: arr => id => {
        return arr.all_items_brands.find(todo => todo.id === id);
    }

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
