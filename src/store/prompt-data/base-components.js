//import Axios from 'axios'
import Vue from 'vue'

const state = () => ({
    news_input_search_value: {},
})

const mutations = {
    setValueNewsInputSearch(state ,data){
        Vue.set(state.news_input_search_value, data.key, data.value)
        },
}

const actions = {
}

const getters = {
    getValueNewsInputSearch: state => key => {
        return state.news_input_search_value[key];
    },

}

export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
