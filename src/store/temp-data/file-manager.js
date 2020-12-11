/**
 * @file Файл-манагер
 */

import Vue from 'vue'



const state = () => ({

    ///### Выбранные ользователем Изображения для конкретной запчасти
    selected_files: [],
    ///### Дефотлтные Изображения продукта для конкретной запчасти
    current_files: [],



})

const mutations = {

    setDataSelectedFiles(state, data){
        Vue.set(state.selected_files, data.key, data.value)
    },

    removeItemSelectedFiles(state, data){
        state.selected_files[data.inputid].splice(data.index, 1);
    },

    setDataCurrentFiles(state, data){
        Vue.set(state.current_files, data.key, data.value)
    },
    ///Откатить все изображения на дефолтные
    resetSelectedFiles(state, data){
        Vue.set(state.selected_files, data.key, state.current_files[data.key]);
        // for (const key in state.current_files[data.key]) {
        //     state.selected_files[data.key].push(state.current_files[+key]);
        // }
    },


}

const actions = {

}

const getters = {

    getCurrentFiles: state => state.current_files,

    ///Получить из хранилища выбранные изображения
    getSelectedFiles: state => state.selected_files,

}

export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
