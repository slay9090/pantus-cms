/**
 * @file Продукты
 */
import Axios from 'axios'

const jsonMaps = require ("@/store/json-config"); // json data-maps


const state = () => ({
    allItemsPartsByFilter: [],
    ///### Кокретная(ые) запчасть(и)
    detail_parts_by_id: [ ],
    ///### Текущие бренды для конкретной запчасти
    current_brands_by_parts: [],
    ///### Текущие категории для конкретной запчасти
    current_categories_by_parts: [],
    ///### Текущие применимости для конкретной запчасти
    current_applicabilities_by_parts: [],

    ///### Узлы выбранных итемов
    parents_selected_items: [],
    ///### Выбранные Изображения для конкретной запчасти
    selected_images: [],
    ///### Изображения продукта для конкретной запчасти
    current_images: [],



})

const mutations = {


    setDataItemsPartsByFilter(state ,data){
        state.allItemsPartsByFilter = data;
    },


    setDataDetailPartsById(state ,data){
        state.detail_parts_by_id = data;
    },

    setDataCurrentBrandsByPart(state, data){
        state.current_brands_by_parts =  data;
    },

    setDataCurrentCategoriesByPart(state, data){
        state.current_categories_by_parts =  data.slice();
    },

    setDataCurrentApplicabilitiesByPart(state, data){
        state.current_applicabilities_by_parts =  data.slice();
    },



    setDataParentsSelectedNodes(state, data){
        state.parents_selected_items = data.slice();
    },


    setDataSelectedImages(state, data){
        state.selected_images = data.slice();
    },

    clearDataSelectedImages(state){
        state.selected_images.splice(0);
    },

    delItemSelectedImages(state, index){
        state.selected_images.splice(index, 1);
    },

    setDataCurrentImages(state, data){
        state.current_images = data.slice();
    },
    ///Откатить все изображения на дефолтные
    resetSelectedImages(state, ){
        state.selected_images = [];
        for (const key in state.current_images) {
            state.selected_images.push(state.current_images[+key]);
        }
    },

}

const actions = {
    async dataDetailPartsById({commit}, id){
      //  console.log(id)
        return  await Axios.get(`http://api.pantus.ru/products_filter?id=${id}`).then( res =>{
           commit("setDataDetailPartsById", jsonMaps.productsPartsItemsList(res.data));
            console.log(res.data)
        })
    },

    async dataItemsPartsByFilter({commit}, urlParams) {
       // console.log('ALLO', jsonMaps.urlMapFilterPartsGetList(urlParams))
        const formattedUrl = jsonMaps.urlMapFilterPartsGetList(urlParams)
        console.log(formattedUrl)
        return await Axios.get('http://api.pantus.ru/products_filter?',
            {
                params: {
                    ...formattedUrl
                }
            }
        ).then(res => {
           commit("setDataItemsPartsByFilter", jsonMaps.productsPartsItemsList(res.data));
           console.log('RESULT FILTER', jsonMaps.productsPartsItemsList(res.data))
        })
    },

}

const getters = {


    getDataItemsPartsByFilter: state => state.allItemsPartsByFilter,


    /// Если ид=нулл вернем весь массив найденных по ид товаров (products_filter?id=${id,id,id ...}), если не нулл, то один конкретный
    // await this.$store.dispatch("ProductParts/dataDetailPartsById", '109478,55171,55213');
    // this.productsJson = await this.$store.getters["ProductParts/getDetailPartsById"]('109478');
    getDetailPartsById: state => id => {
       return  id!==null ? state.detail_parts_by_id.find(data => id === id) : state.detail_parts_by_id
    },


    partsItemById: arr => id => {
        return arr.all_parts.find(todo => todo.productCard.id === id);
    },

    /// ### Текущие бренды этой запчасти
    currentBrandByPart: arr => arr.current_brands_by_parts,
    /// ### Текущие категории этой запчасти
    currentCategoriesByPart: arr => arr.current_categories_by_parts,
    /// ### Текущие применимости этой запчасти
    currentApplicabilitiesByPart: arr => arr.current_applicabilities_by_parts,


    ///все Родительские узлы до текущих узлов
    parentsSelectedNodes: arr => arr.parents_selected_items,

    currentImages: arr => arr.current_images,

    ///Получить из хранилища выбранные изображения
    selectedImages: arr => arr.selected_images,

}

export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
