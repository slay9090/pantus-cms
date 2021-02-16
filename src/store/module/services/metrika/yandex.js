import Axios from 'axios'
import Vue from 'vue'



const state = () => ({
    items: {},
})

const mutations = {
    setItems(state ,data){
        Vue.set(state.items, data.key, data.res)
    },
}

const actions = {


    async getItems({commit}, {endpoint,urlParams, key}) {
            return await Axios.get(process.env.VUE_APP_API_URL_YANDEX_METRIKA+endpoint,
            {
                params: {
                    ...urlParams,
                    id: 21081355,
                    lang: 'ru',
                },
                headers: {
                    Authorization:'OAuth AgAAAAAkgocaAAbf6nV0ZdZLdExZmpzVGaupKv8',
                }
            },

        ).then(res => {
                // console.log(res.data)
            commit("setItems", {key: key, res: res.data});
        })
    },



}

const getters = {

    items: state => key => {
        return state.items[key];
    },

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
