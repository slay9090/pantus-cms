//import Axios from 'axios'
import Vue from 'vue'

const state = () => ({
    input_catalog_value: {},

})

const mutations = {

    setValueInputCatalog(state, data) {
        Vue.set(state.input_catalog_value, data.key, data.value)
    },

}

const actions = {

}

const getters = {

    getValueInputCatalog: state => key => {
        return state.input_catalog_value[key];
    },


}

export default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
