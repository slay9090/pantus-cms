//import Axios from 'axios'
import Vue from 'vue'


const state = () => ({
    table_data: []

})

const mutations = {

    setDataTable(state, data) {
        Vue.set(state.table_data, data.key, data.value)
    },

}

const actions = {

}

const getters = {

    getDataInputCatalog: state => key => {
        return state.table_data[key];
    },

}

export default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
