import Axios from 'axios'
const jsonMaps = require ("@/store/json-config"); // json data-maps


const state = () => ({
    state_data: [],

})

const mutations = {
    SetData(state ,data){
        state.state_data = data;
    },
}

const actions = {

    // действие получение данных по апи
    async GetData({commit}){
        return  await Axios.get(process.env.VUE_APP_API_URL_NEWS_CATEGORIES).then( res =>{
            commit("SetData", jsonMaps.newsCategoriesItemList( res.data));
           // console.log('мы в действиях получили ', jsonMaps.newsCategoriesItemList( res.data));
        })
    },
}

const getters = {
    //получить весь массив
    AllItems: arr => arr.state_data,

    //получить одну запись по ид
    itemById: state => id => {
        return state.state_data.find(item => item.id == id);
    },


}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
