/**
 * @file
 */
import Axios from 'axios'


const state = () => ({

    ///### Все изображения на сервере
    all_images_on_server: [ ],
    selected_images_in_file_manager: [],


})

const mutations = {
    ///Записать урлы в хранилище всех изображений на сервере
    setAllImagesOnServer(state ,data){
        state.all_images_on_server = data;
    },
    /// Добавить в хранилище одно  выбранное изображениЕ  в файл-менеджере
    addItemSelectedImageFromFIleManager(state ,data){
        state.selected_images_in_file_manager.push(data)
    },
    /// Удалить из хранилища одно  выбранное изображениЕ  в файл-менеджере
    delItemSelectedImageFromFIleManager(state, index){
        console.log('del' + index)
        state.selected_images_in_file_manager.splice(index, 1);
    },

    /// Стереть из хранилища все выбранные в файл-менеджере изображения
    clearItemsSelectedImageFromFIleManager(state){
        state.selected_images_in_file_manager.splice(0);
    }

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
    /// Получить из хранилища все урлы серверных изображений выбранных в файлменеджере
    selectedImageFromFIleManager: slctImg => slctImg.selected_images_in_file_manager,


}

export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
