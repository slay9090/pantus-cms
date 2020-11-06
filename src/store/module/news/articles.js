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
        return  await Axios.get(process.env.VUE_APP_API_URL_NEWS_ARTICLES,  ).then( res =>{
           //  Axios.defaults.headers.common['Authorization'] = 'token'
            commit("SetData",jsonMaps.newsArticlesItemsList(res.data));
            console.log('server json ',res.data)
            console.log('myserialize json ', jsonMaps.newsArticlesItemsList(res.data));
        })
    },
    async GetDetalail({commit}, id){
        //https://www.pantus.ru/api/rest/2.0/news/2333
        return  await Axios.get(process.env.VUE_APP_API_URL_NEWS_ARTICLES+'/'+id).then( res =>{
            commit("SetData", res.data);
           console.log('мы в действиях получили ', jsonMaps.newsArticleItemDetail(res.data));
        })
    },
}

const getters = {
    //получить весь массив
    AllItems: arr => arr.state_data,
    //получить одну запись по ид
    ItemById: arr => id => {
        // console.log('In store = ',arr.state_data.find(todo => todo.id === id))
        return arr.state_data.find(todo => todo.id === id);
    }

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
