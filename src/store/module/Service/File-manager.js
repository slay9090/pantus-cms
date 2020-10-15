/**
 * @file
 */
import Axios from 'axios'


const state = () => ({

    ///### Все изображения на сервере
    all_images_on_server: [ ],


})

const mutations = {
    ///Записать урлы в хранилище всех изображений на сервере
    setAllImagesOnServer(state ,data){
        state.all_images_on_server = data;
    },

}

const actions = {

    /// Получить все урлы изображений на сервере
    async getDataAllImageOnServer({commit}){
        return  await Axios.get('https://www.pantus.ru/images_uploader/script.php').then( res =>{
            commit("setAllImagesOnServer", res.data);
           // console.log('мы в действиях получили IMG', res.data);
        })
    },

}

const getters = {

    /// Получить из хранилища все урлы изображений
    imagesAllOnServer: img => img.all_images_on_server,

}

export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
