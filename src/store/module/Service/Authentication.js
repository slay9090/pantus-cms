import Axios from 'axios'


const state = () => ({
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    username: localStorage.getItem('username') || '',

})

const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
    },
    auth_error(state){
        state.status = 'error'
    },
    logout(state){
        state.status = ''
        state.token = ''
    },
}

const actions = {

    login({commit}, user){
        return new Promise((resolve, reject) => {
            commit('auth_request')
           console.log(user.email)
            Axios({url: 'https://reqres.in/api/login', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    //const user = resp.data.user
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', user.email)
                    Axios.defaults.headers.common['Authorization'] = token

                    commit('auth_success', token, ) //  user тоже передать
                    resolve(resp)
                    console.log(token)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },

    // async login({commit}, user){
    //     commit('auth_request')
    //    await Axios.post('https://reqres.in/api/login' ,  user).then( res =>{
    //
    //        Axios.defaults.headers.common['Authorization'] = 'token'
    //        const token = res.data.token
    //                        //const user = resp.data.user
    //                        localStorage.setItem('token', token)
    //                        localStorage.setItem('username', user.email)
    //
    //        commit('auth_success', token, ) //  user тоже передать
    //
    //         console.log('мы в действиях получили ', token);
    //     })
    // },

    logout({commit}){
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            delete Axios.defaults.headers.common['Authorization']
            resolve()

        })
    }

}

const getters = {

    // AllItems: arr => arr.state_data,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isUserName: state => state.username,

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
