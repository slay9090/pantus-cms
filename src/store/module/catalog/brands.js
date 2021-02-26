import Axios from 'axios'
import {baseFunc as $globalFunc} from "@/mixins/global";
const jsonMaps = require ("@/store/json-config"); // json data-maps


const state = () => ({
    all_items: [],
    details_item: {},
    descriptions_all_items: [],
    description_detail_item: {},

})

const mutations = {
    /**
     * ###ЗАПИСАТЬ ВСЕ БРЕНДЫ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     */
    setDataAllItems(state ,data){
        state.all_items = data;
    },

    setDataDetailsItem(state ,data){
        state.details_item = data;
    },

    setDataDescriptionsItemsList(state ,data){
        state.descriptions_all_items = data;
    },

    setDataDescriptionDetailItem(state ,data){
        state.description_detail_item = data;
    }

}

const actions = {

    /**
     * ###ПОЛУЧИТЬ ВСЕ БРЕНДЫ С БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getDataAllItems({commit}){

        return  await Axios.get(process.env.VUE_APP_API_URL_CATALOG_BRANDS).then( res =>{
            commit("setDataAllItems", jsonMaps.catalogBrandsList(res.data) );
        })
    },

    async getDataDetailsItem({commit}, id){

        let fetchSummoner = async() => {

            const brandDetail = await Axios.get(`${process.env.VUE_APP_API_URL_CATALOG_BRANDS}/${id}`);
            const descriptonDetail = brandDetail.data.description_id !== null ?
                await Axios.get(`${process.env.VUE_APP_API_URL_CATALOG_BRANDS}/descriptions/${brandDetail.data.description_id}`) :
                null
            const summoner = brandDetail.data;
            summoner.description = descriptonDetail !== null ?  descriptonDetail.data : null;
            return summoner;
        }
        // console.log(await fetchSummoner())
        commit("setDataDetailsItem", jsonMaps.catalogBrandDetail( await fetchSummoner()));

    },

    async getDescriptionsItemsList({commit}){
        console.log('call')
        return  await Axios.get(`${process.env.VUE_APP_API_URL_CATALOG_BRANDS}/descriptions`).then( res =>{
            commit("setDataDescriptionsItemsList", jsonMaps.catalogBrandsDescriptionsList(res.data) );
        })
    },

    async getDescriptionDetailItem({commit}, id){
        return  await Axios.get(`${process.env.VUE_APP_API_URL_CATALOG_BRANDS}/descriptions/${id}`).then( res =>{
            commit("setDataDescriptionDetailItem", jsonMaps.catalogBrandDescriptionDetail(res.data) );
        })
    },

    async sendFormDescriptionEdit({getters} , id){
        // console.log(jsonMaps.crmOrderFormDataForSend(getters.itemDetailsById))
        await Axios.patch(process.env.VUE_APP_API_URL_CATALOG_BRANDS+`/descriptions/${id}`,
            jsonMaps.catalogBrandDescriptionFormDataForSend(getters.descriptionDetailItem),
            {}
        ).then( res =>{
            console.log(res.data)
            if(res.data.success){$globalFunc.setAlertMessage('success', 'Запрос выполнен успешно');}
            if(res.data.error){$globalFunc.setAlertMessage('danger', `Запрос не выполнен, ошибка: ${res.data.error.description}`);}

        }).catch(function (error) {
            console.error(error)
            $globalFunc.setAlertMessage('danger', `Запрос не выполнен, ошибка: ${error}`);
        });
    },
    /// разобратся чё за хуата
    async sendFormDescriptionAdd({dispatch}, dataForm){
        console.log('???', dataForm)
        await Axios.post(process.env.VUE_APP_API_URL_CATALOG_BRANDS+`/descriptions`,
            jsonMaps.catalogBrandDescriptionFormDataForSend(dataForm),
            {}
        ).then( res =>{
            console.log('CREATEL: ',res.data)
            if(res.data.success){$globalFunc.setAlertMessage('success', 'Запрос выполнен успешно');}
            if(res.data.error){$globalFunc.setAlertMessage('danger', `Запрос не выполнен, ошибка: ${res.data.error.description}`);}

        }).catch(function (error) {
            console.error(error)
            $globalFunc.setAlertMessage('danger', `Запрос не выполнен, ошибка: ${error}`);
        });
    },

    /// разобратся чё за хуата
    async sendDescriptionDelete({dispatch}, id){
        await Axios.delete(process.env.VUE_APP_API_URL_CATALOG_BRANDS+`/descriptions/${id}`,
            {}
        ).then( res =>{
            console.log('DELETE: ',res.data)
            if(res.data.success){$globalFunc.setAlertMessage('success', 'Запрос выполнен успешно');}
            if(res.data.error){$globalFunc.setAlertMessage('danger', `Запрос не выполнен, ошибка: ${res.data.error.description}`);}

        }).catch(function (error) {
            console.error(error)
            $globalFunc.setAlertMessage('danger', `Запрос не выполнен, ошибка: ${error}`);
        });
    },
}

const getters = {
    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ БРЕНДЫ
     * @param arr
     * @returns {[]}
     */
    allItems: state => state.all_items,

    detailsItem: state => state.details_item,

    descriptionsItemsList: state => state.descriptions_all_items,

    descriptionDetailItem: state => state.description_detail_item,



}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}


// -----------------------------------------------
//     добавление:
// POST api.pantus.ru/product_brands/descriptions
// body:
// {
//     "code": "---",
//     "aliases": "---",
//     "description": "---"
// }
//
// -----------------------------------------------
//     редактирование:
// PATCH api.pantus.ru/product_brands/descriptions/{id}
// {
//     "code": "---",
//     "aliases": "---",
//     "description": "---"
// }
//
// -----------------------------------------------
//     удаление
// DELETE api.pantus.ru/product_brands/descriptions/{id}