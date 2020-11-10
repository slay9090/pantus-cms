//import Axios from 'axios'
import Vue from 'vue'

const state = () => ({
    input_search_value: {},
    input_index_value: {},
    html_editor: {},
})

const mutations = {
    setValueInputSearch(state, data) {
        Vue.set(state.input_search_value, data.key, data.value)
    },

    setValueInputIndex(state, data) {
        Vue.set(state.input_index_value, data.key, data.value)
    },

    setValueHtmlEditor(state, data) {
        Vue.set(state.html_editor, data.key, data.value)
    },


}

const actions = {}

const getters = {
    getValueInputSearch: state => key => {
        return state.input_search_value[key];
    },

    getValueInputIndex: state => key => {
        return state.input_index_value[key];
    },

    getValueHtmlEditor: state => key => {
        return state.html_editor[key];
    },



}

export default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
