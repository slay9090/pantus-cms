//import Axios from 'axios'
import Vue from 'vue'

const state = () => ({
    input_search_value: {},
    input_index_value: {},
    html_editor: {},
    input_text_value: {},

    table_limit_data: {},
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

    setValueInputText(state, data) {
        Vue.set(state.input_text_value, data.key, data.value)
    },

    setDataLimitTable(state, data){
        Vue.set(state.table_limit_data, data.key, data.value)
    }

}

const actions = {

}

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

    getValueInputText: state => key => {
        return state.input_text_value[key];
    },

    getDataLimitTable: state => key => {
        return state.table_limit_data[key];
    },

}

export default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
