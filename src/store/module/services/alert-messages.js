

const state = () => ({
    message: {},
})

const mutations = {
    /** ##Message alert
     * ### {type: 'info', text: 'lorem ...'}
     * ### info - инфа, фон синиий
     * ### warning - предупреждение, фон желтый
     * ### danger - ошибка, фон красный
     * ### success - успех, фон зеленый
     * @summary Сообщение в хедер
     *
     * @param state
     * @param data
     */
    setAlert(state ,data){
        state.message = data;
    },
}

const getters = {
    //получить
    alert: state => state.message,
}
export  default {
    getters,
    mutations,
    state,
    namespaced: true,
}
