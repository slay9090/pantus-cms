import Axios from 'axios'
const jsonMaps = require ("@/store/json-config"); // json data-maps


const state = () => ({
    all_items_categories: [],

})

const mutations = {
    /**
     * ###ЗАПИСАТЬ ВСЕ КАТЕГОРИИ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     */
    setDataAllCategories(state ,data){
        state.all_items_categories = data;
    },
}

const actions = {

    /**
     * ###ПОЛУЧИТЬ ВСЕ КАТЕГОРИИ С БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getDataAllItems({commit}){
        return  await Axios.get(process.env.VUE_APP_API_URL_CATALOG_CATEGORIES).then( res =>{
            commit("setDataAllCategories", jsonMaps.catalogCategoriesList(res.data));
           //  console.log('мы в действиях CATEGORIES получили ', res.data);
        })
    },
}

const getters = {
    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ КАТЕГОРИИ
     * @param arr
     * @returns {[]}
     */
    allItems: arr => arr.all_items_categories,

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЮ ИНФОРМАЦИЮ ОБ ЭТОЙ КАТЕГОРИИ ПО ИД
     * @param arr
     * @summary `await this.$store.getters["имяМодуля/имяГетера"](Аргументы)`
     * @returns {function(*): *}
     */
    itemById: arr => id => {
        let item;
        function  findItemById (id, data) {
            data.forEach(elem => {
                if (elem.id === id){
                   item = elem;
                }
                if (elem.children && elem.children.length > 0){
                    findItemById(id, elem.children);
                }
            })
            return item;
        }

       return  findItemById(id, arr.all_items_categories)
    }

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
