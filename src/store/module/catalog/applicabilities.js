import Axios from 'axios'
const jsonMaps = require ("@/store/json-config"); // json data-maps


const state = () => ({
    all_items_applicabilities: [],

})

const mutations = {
    /**
     * ###ЗАПИСАТЬ ВСЕ ПРИМЕНИМОСТИ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     */
    setDataAllApplicabilities(state ,data){
        state.all_items_applicabilities = data;
    },
}

const actions = {

    /**
     * ###ПОЛУЧИТЬ ВСЕ ПРИМЕНИМОСТИ С БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getDataAllItems({commit}){


        return  await Axios.get(process.env.VUE_APP_API_URL_CATALOG_APPLICABILITIES).then( res =>{


            commit("setDataAllApplicabilities",jsonMaps.catalogApplicabilitiesList(res.data));

        })
    },
}

const getters = {
    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ ПРИМЕНИМОСТИ
     * @param arr
     * @returns {[]}
     * @constructor
     */
    allItems: arr => arr.all_items_applicabilities,

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЮ ИНФОРМАЦИЮ ОБ ЭТОЙ ПРИМЕНИМОСТИ ПО ИД
     * @param arr
     * @returns {function(*): *}
     * @summary `await this.$store.getters["имяМодуля/имяГетера"](Аргументы)`
     * @constructor
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

        return  findItemById(id, arr.all_items_applicabilities)
    },




}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
