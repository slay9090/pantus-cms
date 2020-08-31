import Axios from 'axios'

const state = () => ({
    todos: [],

})
const mutations = {
    SetItem(state ,data){
        state.todos = data;
    }
}
const actions = {
    async Item({commit, getters}){
        let data =  await Axios.get('https://www.pantus.ru/api/rest/2.0/brands');
        commit("SetItem",data.data['data']);
        console.log(data);
        console.log(getters["GetItem"]);
        // let data = await axios.get("dsada").then( res => res)

    }
}
const getters = {
    GetItem: s => s.todos
}
export  default {
    getters,
    actions,
    mutations,
    state,
}
