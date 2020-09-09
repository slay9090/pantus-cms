import Axios from 'axios'


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
        return  await Axios.get('https://www.pantus.ru/api/rest/2.0/news').then( res =>{
            commit("SetData",res.data.data);
            // console.log('мы в действиях получили ', res.data);
        })
    },
}

const getters = {
    //получить весь массив
    AllItems: arr => arr.state_data,
    //получить одну запись по ид
    ItemById: arr => id => {
        //  console.log('In store = ',state.state_data.find(todo => todo.id === id))
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
