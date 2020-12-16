/**
 * @file Файл-манагер
 */

import Vue from 'vue'
import Axios from "axios";



const state = () => ({

    ///### Выбранные ользователем Изображения для конкретной запчасти
    selected_images: [],
    ///### Дефотлтные Изображения продукта для конкретной запчасти
    current_images: [],

    text_notifications: null,

    all_images_on_server: [],





})

const mutations = {

    setAllImagesOnServer(state ,data){
        //Vue.set(state.all_images_on_server, data)
       state.all_images_on_server = data;

        // data.forEach( elem => {
        //     state.all_images_on_server.push(elem)
        // })

    },


    setDataSelectedFiles(state, data){
        Vue.set(state.selected_images, data.key, data.value)
    },

    removeItemSelectedFiles(state, data){
       if (state.selected_images[data.key].length > 0) state.selected_images[data.key].splice(data.index, 1);
    },

    addItemSelectedFiles(state, data){
       // state.selected_images[data.key].splice(data.index, 1);
        state.selected_images[data.key].push(data.value)
    },

    setDataCurrentFiles(state, data){
        Vue.set(state.current_images, data.key, data.value)
    },
    ///Откатить все изображения на дефолтные
    resetSelectedFiles(state, data){
        Vue.set(state.selected_images, data.key, state.current_images[data.key].slice());
    },

    setTextNotifications(state, obj){
        state.text_notifications = obj;
    },


}

const actions = {

  async  getPropertyImages ({commit}, data){

         let metaDataInfoImg = []
            metaDataInfoImg.complite=false

        /// Получаем имя файла
        function  getNameImg(url){
            return   url.split('/').pop()
        }

        ///  Получить и вернуть разрешение изображения
        async function getMetaInfo(url){
            return new Promise((resolve, reject) => {
                let img = new Image()
                img.onload = () => resolve(img.naturalWidth+'x'+img.naturalHeight)
                img.onerror = reject
                img.src = url
            })
        }
        /// получить размер контента гет запросом = размер файла
        async function getFileSize(url) {
            let err = null;
            let response = await Axios.get(url).catch(function (error){
                err= error
            });
            /// заодно обрабатываем исключения, что бы всеравно вывести изображения
            if (err !== null){
               // this.$store.commit('FileManager/setTextNotifications', {type: 'danger', text: err})
                //this.loadingFile = false

            }
            return response.headers['content-length']

        }
        /// Запускаем в хуке, кидаем урлы из хранилища -> через вычисляемое свойство , ждем выполнения очереди промисов
      function  getMetaDataImg(curentUrl){
            let counter=0;
           // curentUrl = ['https://www.pantus.ru/upload/iblock/48c/%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%D1%8B2.jpg',]
           // console.log('curentUrl', curentUrl)
            curentUrl.forEach(async (url, idx, array) => {
                metaDataInfoImg.splice(idx, 0, ([0, 'unknown'])); // предварительно заполняем массив свойст изобр. что бы индексы соответсвовали в случае исключ.
                Promise.all([url ,getNameImg(url), await getFileSize(url), await getMetaInfo(url), ])
                    .then(values => {
                            metaDataInfoImg.splice(idx, 1, (values)); // записываем в дату строго по индексу, что бы свойства файлов соотствовали самим фйлам, иначе рандом.

                           // / / Ждем окончания загрузки, отключаем фон
                            counter++;
                            if (counter === array.length) {
                                //this.loadingFile = false;
                                metaDataInfoImg.complite=true
                               // return metaDataInfoImg;
                            }
                        }
                    )

            });
          // console.log(metaDataInfoImg)
          return metaDataInfoImg;
        }

       return getMetaDataImg(data.url);

    },

    /// Получить все урлы изображений на сервере
    async getDataAllImageOnServer({commit}){
        return  await Axios.get('https://www.pantus.ru/images_uploader/script.php').then( res =>{
            commit("setAllImagesOnServer", res.data);
             console.log('мы в действиях получили IMG', res.data);
        })
    },

}

const getters = {


    /// Получить из хранилища все урлы изображений
    imagesAllOnServer: img => img.all_images_on_server,

    getCurrentFiles: state => key => {
        return state.current_images[key];
    },

    ///Получить из хранилища выбранные изображения
    getSelectedFiles: state => key => {
        return state.selected_images[key];
    },

    textNotifications: text => text.text_notifications,
}

export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
