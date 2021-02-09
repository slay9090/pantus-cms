import Axios from 'axios'
const jsonMaps = require ("@/store/json-config"); // json data-maps



const state = () => ({
    news_list: [],
    news_details: {},

})

const mutations = {
    setNewsList(state ,data){
        state.news_list = data;
    },
    setNewsItemDetails(state ,data){
        state.news_details = data;
    },
}

const actions = {

    // действие получение данных по апи
    async pullNewsList({commit}){
        return  await Axios.get(process.env.VUE_APP_API_URL_NEWS_ARTICLES,  ).then( res =>{
            commit("setNewsList",jsonMaps.newsArticlesItemsList(res.data));
        })
    },
    async pullNewsItemDetails({commit}, id){
        //https://www.pantus.ru/api/rest/2.0/news/2333
        return  await Axios.get(process.env.VUE_APP_API_URL_NEWS_ARTICLES+'/'+id).then( res =>{
            commit("setNewsItemDetails", jsonMaps.newsArticleItemDetail(res.data) );
        })
    },
}

const getters = {
    //получить весь массив
    getNewsList: state => state.news_list,
    //получить одну запись по ид
    getNewsItemDetails: state => state.news_details,

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
