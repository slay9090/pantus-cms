import Axios from 'axios'


const state = () => ({
    state_data: [],

})
const mutations = {
    SetItem(state ,data){
        state.state_data = data;
    },


}
const actions = {
    async Item({commit}){
        return  await Axios.get('http://194.67.113.201:8080/categories?view=tree').then( res =>{
            commit("SetItem",res.data);
          //  console.log('мы в действиях получили ', res.data);
        })
    },

    async ItemPlain({commit}){
        return  await Axios.get('http://194.67.113.201:8080/categories?view=plain').then( res =>{
            commit("SetItem",res.data);
         //   console.log('мы в действиях получили ', res.data);
        })
    }


}
const getters = {
    GetItem: s => s.state_data,

    getTodoById: state => id => {
      //  console.log('In store = ',state.state_data.find(todo => todo.id === id))
        return state.state_data.find(todo => todo.id === id);
    }

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
