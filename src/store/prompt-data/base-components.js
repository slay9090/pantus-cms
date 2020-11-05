//import Axios from 'axios'
const state = () => ({
    news_input_search_value: null,
})

const mutations = {
    setValueNewsInputSearch(state ,data){state.news_input_search_value = data;},
}

const actions = {
}

const getters = {
    getValueNewsInputSearch: arr => arr.news_input_search_value,
}

export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
