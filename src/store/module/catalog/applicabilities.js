import Axios from 'axios'


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
            commit("setDataAllApplicabilities",res.data);
            // console.log('мы в действиях получили ', res.data);
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
        //  console.log('In store = ',state.state_data.find(todo => todo.id === id))
        return arr.all_items_applicabilities.find(todo => todo.id === id);
    }

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
