

const state = () => ({
    message: {},
})

const mutations = {
    setAlert(state ,data){
        state.message = data;
    },
}

const getters = {
    //получить весь массив
    alert: state => state.message,
}
export  default {
    getters,
    mutations,
    state,
    namespaced: true,
}
