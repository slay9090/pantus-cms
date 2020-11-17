//import Axios from 'axios'
import Vue from 'vue'


const state = () => ({
    input_catalog_value: {},
    temp_input_catalog_value: [],

    node_items_input_catalog: [],

})

const mutations = {

    setValueInputCatalog(state, data) {
        Vue.set(state.input_catalog_value, data.key, data.value)
    },

    addItemTempValue(state, data){
        state.temp_input_catalog_value.push(data);
    },

    removeItemTempValue(state, index){
        state.temp_input_catalog_value.splice(index, 1);
    },

    setDataParentsSelectedNodes(state, data){
        state.node_items_input_catalog = data.slice();
    },

    clearDataParentsSelectedNodes(state){
        state.node_items_input_catalog.splice(0);
    },



    setDataItemTempValue(state, data){
        state.temp_input_catalog_value = data.slice();
    },



}

const actions = {
    async loadValueInputCatalog({commit}, data){
        return  await commit("setValueInputCatalog",data);
    },

    async loadTempValueInputCatalog({commit}, data){
        return  await commit("setDataItemTempValue",data);
    },

}

const getters = {

    getValueInputCatalog: state => key => {
        return state.input_catalog_value[key];
    },


    getTempValuesInputCatalog: arr => arr.temp_input_catalog_value,

    /// Все потомки выбранных узлов, что бы раскрыть список
    parentsSelectedNodes: arr => arr.node_items_input_catalog,


    // getValueInputCatalogId: (state => (key) => (
    //     state.input_catalog_value[key].id.map(key => state.input_catalog_value[key])
    // )),

//     getValueInputCatalogId: (state) => (key) => {
//         return state.input_catalog_value[key].id;
// }

}

export default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
