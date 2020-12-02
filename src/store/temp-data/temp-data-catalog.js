//import Axios from 'axios'
import Vue from 'vue'


const state = () => ({
    input_catalog_value: {},
    temp_input_catalog_value: {},
    node_items_input_catalog: {},
    id_input_for_recursive: null,
    temp_all_items_current_filter: [],

})

const mutations = {

    setValueInputCatalog(state, data) {
        Vue.set(state.input_catalog_value, data.key, data.value)
    },

    addItemTempValue(state, data){
        if(state.temp_input_catalog_value[data.key] === undefined){
            state.temp_input_catalog_value[data.key] = [];
        }
        state.temp_input_catalog_value[data.key].push(data.value)

    },

    removeItemTempValue(state, data){
     //   console.log(data)
        state.temp_input_catalog_value[data.inputid].splice(data.index, 1);
    },

    setDataParentsSelectedNodes(state, data){
        Vue.set(state.node_items_input_catalog, data.key, data.value)
        //state.node_items_input_catalog = data.slice();
    },


    clearDataItemsTempValue(state, data){
        state.temp_input_catalog_value[data.inputid]=[];
    },


    setIdInput(state, data){
        state.id_input_for_recursive = data.slice();
    },
    
    setDataTempItemsForCurrentFilter(state, data){
        Vue.set(state.temp_all_items_current_filter, data.key, data.value)
    },


}

const actions = {
    async loadValueInputCatalog({commit}, data){
        return  await commit("setValueInputCatalog",data);
    },

    // async loadParentsSelectedNodes({commit}, data){
    //     return  await commit("setDataParentsSelectedNodes",data);
    // },

    async addPathTreeForThisNode({commit}, data){
        ///НАЧАЛО ПОЛУЧАЕМ И ФОРМИРУЕМ ПУТЬ ДО ВЫБРАННЫХ УЗЛОВ

       function getAllParentsForAllSelectedNodes(selectedCatalogFilter) {

            let parent = []
            selectedCatalogFilter.forEach(element => {
                parent.push(getAllParentForOneNode(data.items, element.id))
            })

            return parent
        }
        function getAllParentForOneNode(dataset, nodeId) {

            let parents = []
            var TreeModel = require('tree-model'),
                tree = new TreeModel();
            dataset.forEach(element => {
                let rootMain = tree.parse(element);
                rootMain.walk(function (node) {
                    if (node.model.id === nodeId) {
                        let x = node.getPath()
                        x.forEach(element => {
                            parents.push(element.model.id)

                        })
                    }
                })
            })

            return parents
        }

        return  await commit("setDataParentsSelectedNodes",
            {
                'key': data.key,
                'value': getAllParentsForAllSelectedNodes(data.value)}
            );

        ///КОНЕЦ ПОЛУЧАЕМ И ФОРМИРУЕМ ПУТЬ ДО ВЫБРАННЫХ УЗЛОВ
    },

}

const getters = {

    getValueInputCatalog: state => key => {
        return state.input_catalog_value[key];
    },

    getTempValuesInputCatalog: state => key => {
        return state.temp_input_catalog_value[key];
    },

    /// Все потомки выбранных узлов, что бы раскрыть список
    parentsSelectedNodes: state => key => {
        return state.node_items_input_catalog[key];
    },

    idInput: state => state.id_input_for_recursive,
    
    getTempAllItemsCurrentFilter: state => key => {
        return state.temp_all_items_current_filter[key];
    },



}

export default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
