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
    auth_success(state, data){
        state.status = 'success'
        state.token = data.token
        state.username = data.username
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
          // console.log(user.email, user.password)
            Axios({url: 'http://adm.pantus.ru:8081/auth/login', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token

                    console.log('New TOken', token)

                    localStorage.setItem('token', token)
                    localStorage.setItem('username', user.login)
                    Axios.defaults.headers.common['Authorization'] = token

                    commit('auth_success', {token: token, username: user.login}) //  user тоже передать
                    resolve(resp)

                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },

    logout({commit}){
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.removeItem('username')
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
