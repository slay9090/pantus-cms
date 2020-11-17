/**
 * @file xaxaxa
 */
import Axios from 'axios'


const state = () => ({

    ///### Все продукты
    all_parts: [ ],
    ///### Текущие бренды для конкретной запчасти
    current_brands_by_parts: [],
    ///### Текущие категории для конкретной запчасти
    current_categories_by_parts: [],
    ///### Текущие применимости для конкретной запчасти
    current_applicabilities_by_parts: [],
    ///### Выбранные бренды для конкретной запчасти
    selected_brands: [],
    ///### Выбранные категории для конкретной запчасти
    selected_categories: [],
    ///###Выбранные применимости для конкретной запчасти
    selected_applicabilities: [],
    ///### Узлы выбранных итемов
    parents_selected_items: [],
    ///### Выбранные Изображения для конкретной запчасти
    selected_images: [],
    ///### Изображения продукта для конкретной запчасти
    current_images: [],

})

const mutations = {

    /**
     * ЗАПИСАТЬ ВСЕ ПРОДУКТЫ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     * @constructor
     */
    setDataAllParts(state ,data){
        state.all_parts = data;
    },
    /**
     * Записать в текущие Бренды товара
     * @param state
     * @param data {Array} - массив брендов
     */
    setDataCurrentBrandsByPart(state, data){
        state.current_brands_by_parts =  data;
    },
    /**
     * Записать в текущие Категории товара
     * @param state
     * @param data {Array} - массив категор
     */
    setDataCurrentCategoriesByPart(state, data){

        state.current_categories_by_parts =  data.slice();

       // console.log('state.current_categories_by_parts ',state.current_categories_by_parts)
    },
    /**
     * Записать в текущие Применимости товара
     * @param state
     * @param data {Array} - массив применимости
     */
    setDataCurrentApplicabilitiesByPart(state, data){
        state.current_applicabilities_by_parts =  data.slice();
    },


    /**
     * ДОБАВИТЬ ВЫБРАННЫЙ БРЕНД
     * @param state
     * @param data
     */
    addItemSelectedBrands(state, data){
        state.selected_brands.push(data);
    },


    /**
     * УДАЛИТЬ ВЫБРАННЫе БРЕНДы
     * @param state
     * @param index
     */
    clearItemSelectedBrands(state, ){
        state.selected_brands.splice(0);

    },

    /**
     * ДОБАВИТЬ ВЫБРАНую КАТЕГОРИю
     * @param state
     * @param data
     */
    addItemSelectedCategories(state, data){
        state.selected_categories.push(data);
    },

    addItemSelectedApplicabilities(state, data){
        state.selected_applicabilities.push(data);
    },

    /**
     * ###УДАЛИТЬ ВЫБРАННУЮ КАТЕГОРИЮ
     * @param state
     * @param index
     */
    deleteItemSelectedCategories(state, index){
        state.selected_categories.splice(index, 1);
    },

    deleteItemSelectedApplicabilities(state, index){
        state.selected_applicabilities.splice(index, 1);
    },

    /**
     * ###Очистить хранилище выбранные категории
     * @param state
     */
    clearItemSelectedCategories(state){
        state.selected_categories.splice(0);
    },

    clearItemsSelectedApplicabilities(state) {
        state.selected_applicabilities.splice(0);
    },

    setDataParentsSelectedNodes(state, data){
        state.parents_selected_items = data.slice();

    },

    clearDataParentsSelectedNodes(state){
        state.parents_selected_items.splice(0);
    },

    /**
     * ЗАписать выбанные изображения в хранилище
     * @param state
     * @param data
     */
    setDataSelectedImages(state, data){
        state.selected_images = data.slice();
    },
    /**
     * очистить хранилище выбранных изобрпажений
     * @param state
     */
    clearDataSelectedImages(state){
        state.selected_images.splice(0);
    },
    /**
     * Удалить айтем из хранилища
     * @param state
     * @param index - индекс элемента в массиве, который удалим.
     */
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

    /**
     * ###ПОЛУЧИТЬ ВСЕ ПРОДУКТЫ ИЗ БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     * @constructor
     */
    async getDataAllParts({commit}){
        let fakedata=  [
            {
                "productCard": {
                    "id": 1,
                    "bitrixId": 1,
                    "active": true,
                    "name": "Шланг-ф45-3",
                    "sku": {
                        "original": "2170-5206064AD",
                        "normalized": null
                    },
                    "brand": {
                        "id": 266,
                        "name": "РЕЗИНОТЕХНИКА",
                        "code": "REZINOTEHNIKA",
                        "timestampCreated": null,
                        "timestampUpdated": null
                    },
                    "categories": [
                        {
                            "id": 2950,
                            "parentId": 2966,
                            "code": null,
                            "name": "Катушка зажигания",
                            "lft": null,
                            "rght": null,
                            "treeId": null,
                            "level": null,
                            "children": null
                        },
                        {
                            "id": 483,
                            "parentId": 315,
                            "code": null,
                            "name": "Кожухи опор амортизаторов",
                            "lft": null,
                            "rght": null,
                            "treeId": null,
                            "level": null,
                            "children": null
                        }
                    ],
                    "applicabilities": [
                        {
                            "id": 4981,
                            "parentId": 4865,
                            "code": null,
                            "name": "2197 (Datsun ON-DO)",
                            "description": null,
                            "lft": null,
                            "rght": null,
                            "treeId": null,
                            "level": null,
                            "children": null
                        },
                        {
                            "id": 5338,
                            "parentId": 5338,
                            "code": null,
                            "name": "XRAY Cross",
                            "description": null,
                            "lft": null,
                            "rght": null,
                            "treeId": null,
                            "level": null,
                            "children": null
                        },
                    ],
                    "productCardImages": {
                        "main": {
                            "id": 482,
                            "active": null,
                            "name": "img",
                            "slug": null,
                            "hash": null,
                            "url": "https://www.pantus.ru/images_uploader/images/857335.jpg",
                            "timestampCreated": null,
                            "productCardId": null,
                            "main": null
                        },
                        "album": [
                            {
                                "id": 344,
                                "active": null,
                                "name": "kinnn1",
                                "slug": null,
                                "hash": null,
                                "url": "https://www.pantus.ru/images_uploader/images/Screenshot_1.jpg",
                                "timestampCreated": null,
                                "productCardId": null,
                                "main": null
                            },
                            {
                                "id": 345,
                                "active": null,
                                "name": "kinnn2",
                                "slug": null,
                                "hash": null,
                                "url": "https://www.pantus.ru/images_uploader/images/объект.png",
                                "timestampCreated": null,
                                "productCardId": null,
                                "main": null
                            }
                        ]
                    },
                    "productCardMeasures": {
                        "length": null,
                        "width": null,
                        "height": null,
                        "weight": null
                    },
                    "productCardOems": [
                        {
                            "manufacturerOems": [
                                ""
                            ],
                            "foreignOems": [
                                ""
                            ]
                        }
                    ],
                    "timestampCreated": null,
                    "timestampUpdated": "09.12.2015 14:50:25"
                },
                "productOffer": {
                    "id": null,
                    "bitrixId": null,
                    "active": null,
                    "productCardId": null,
                    "bitrixproductCardId": null,
                    "guid": null,
                    "nomenclatureCode": null,
                    "quantity": null,
                    "multiplicity": null,
                    "pantusDepartment": {
                        "id": null,
                        "name": null
                    },
                    "supplier": {
                        "id": null,
                        "nomenclatureCode": null,
                        "code": null,
                        "name": null,
                        "deliveryDelay": null
                    },
                    "prices": {
                        "wholesale": null,
                        "retail": 99.99,
                        "brt1": null,
                        "brt2": null,
                        "brt3": null,
                        "brt4": null,
                        "brt5": null,
                        "brt6": null,
                        "brt75": null,
                        "brt10": null
                    },
                    "timestampCreated": null,
                    "timestampUpdated": null
                }
            },
            {
                "productCard": {
                    "id": 2,
                    "bitrixId": 1,
                    "active": true,
                    "name": "Шланг-ф45-3",
                    "sku": {
                        "original": null,
                        "normalized": null
                    },
                    "brand": {
                        "id": 12,
                        "bitrixId": 12,
                        "active": null,
                        "name": "РЕЗИНОТЕХНИКА",
                        "code": "REZINOTEHNIKA",
                        "timestampCreated": null,
                        "timestampUpdated": null
                    },
                    "categories": [
                        {
                            "id": 5096,
                            "parentId": 5097,
                            "code": null,
                            "name": "Прокладки и крышки",
                            "lft": null,
                            "rght": null,
                            "treeId": null,
                            "level": null,
                            "children": null
                        }
                    ],
                    "applicabilities": [
                        {
                            "id": 4820,
                            "parentId": 4819,
                            "code": null,
                            "name": "Almera",
                            "description": null,
                            "lft": null,
                            "rght": null,
                            "treeId": null,
                            "level": null,
                            "children": null
                        }
                    ],
                    "productCardImages": {
                        "main": {
                            "id": 482,
                            "active": null,
                            "name": "img",
                            "slug": null,
                            "hash": null,
                            "url": "http://www.pantus.ru/upload/iblock/042/10034697ASP%20-%20Прокладка%20бензонасоса%20ВАЗ%2021082%20силикон%20синий%20-%20A-Sport.jpg",
                            "timestampCreated": null,
                            "productCardId": null,
                            "main": null
                        },
                        "album": [
                            {
                                "id": 344,
                                "active": null,
                                "name": "kinnn",
                                "slug": null,
                                "hash": null,
                                "url": "https://www.pantus.ru/images_uploader/images/Porsche-911 Turbo Cabriolet-2008-5.jpg",
                                "timestampCreated": null,
                                "productCardId": null,
                                "main": null
                            },
                            {
                                "id": 344,
                                "active": null,
                                "name": "kinnn",
                                "slug": null,
                                "hash": null,
                                "url": "http://www.pantus.ru/upload/iblock/eca/00034867ALT%20-%20Патрубки%20печки%20ВАЗ%201118%20-%20Ассоциация%20Балаковских%20Производителей%20Автозапчастей.jpg",
                                "timestampCreated": null,
                                "productCardId": null,
                                "main": null
                            }
                        ]
                    },
                    "productCardMeasures": {
                        "length": null,
                        "width": null,
                        "height": null,
                        "weight": null
                    },
                    "productCardOems": [
                        {
                            "manufacturerOems": [
                                ""
                            ],
                            "foreignOems": [
                                ""
                            ]
                        }
                    ],
                    "timestampCreated": null,
                    "timestampUpdated": null
                },
                "productOffer": {
                    "id": null,
                    "bitrixId": null,
                    "active": null,
                    "productCardId": null,
                    "bitrixproductCardId": null,
                    "guid": null,
                    "nomenclatureCode": null,
                    "quantity": null,
                    "multiplicity": null,
                    "pantusDepartment": {
                        "id": null,
                        "name": null
                    },
                    "supplier": {
                        "id": null,
                        "nomenclatureCode": null,
                        "code": null,
                        "name": null,
                        "deliveryDelay": null
                    },
                    "prices": {
                        "wholesale": null,
                        "retail": null,
                        "brt1": null,
                        "brt2": null,
                        "brt3": null,
                        "brt4": null,
                        "brt5": null,
                        "brt6": null,
                        "brt75": null,
                        "brt10": null
                    },
                    "timestampCreated": null,
                    "timestampUpdated": null
                }
            },
            {
                "productCard": {
                    "id": 3,
                    "bitrixId": 1,
                    "active": true,
                    "name": "Шланг-ф45-3",
                    "sku": {
                        "original": null,
                        "normalized": null
                    },
                    "brand": {
                        "id": 12,
                        "bitrixId": 12,
                        "active": null,
                        "name": "РЕЗИНОТЕХНИКА",
                        "code": "REZINOTEHNIKA",
                        "timestampCreated": null,
                        "timestampUpdated": null
                    },
                    "categories": [
                        {
                            "id": 5096,
                            "parentId": 5097,
                            "code": null,
                            "name": "Прокладки и крышки",
                            "lft": null,
                            "rght": null,
                            "treeId": null,
                            "level": null,
                            "children": null
                        }
                    ],
                    "applicabilities": [
                        {
                            "id": 4820,
                            "parentId": 4819,
                            "code": null,
                            "name": "Almera",
                            "description": null,
                            "lft": null,
                            "rght": null,
                            "treeId": null,
                            "level": null,
                            "children": null
                        }
                    ],
                    "productCardImages": {
                        "main": {
                            "id": 482,
                            "active": null,
                            "name": "img",
                            "slug": null,
                            "hash": null,
                            "url": null,
                            "timestampCreated": null,
                            "productCardId": null,
                            "main": null
                        },
                        "album": [
                            {
                                "id": 344,
                                "active": null,
                                "name": "kinnn",
                                "slug": null,
                                "hash": null,
                                "url": null,
                                "timestampCreated": null,
                                "productCardId": null,
                                "main": null
                            },
                            {
                                "id": 344,
                                "active": null,
                                "name": "kinnn",
                                "slug": null,
                                "hash": null,
                                "url": null,
                                "timestampCreated": null,
                                "productCardId": null,
                                "main": null
                            }
                        ]
                    },
                    "productCardMeasures": {
                        "length": null,
                        "width": null,
                        "height": null,
                        "weight": null
                    },
                    "productCardOems": [
                        {
                            "manufacturerOems": [
                                ""
                            ],
                            "foreignOems": [
                                ""
                            ]
                        }
                    ],
                    "timestampCreated": null,
                    "timestampUpdated": null
                },
                "productOffer": {
                    "id": null,
                    "bitrixId": null,
                    "active": null,
                    "productCardId": null,
                    "bitrixproductCardId": null,
                    "guid": null,
                    "nomenclatureCode": null,
                    "quantity": null,
                    "multiplicity": null,
                    "pantusDepartment": {
                        "id": null,
                        "name": null
                    },
                    "supplier": {
                        "id": null,
                        "nomenclatureCode": null,
                        "code": null,
                        "name": null,
                        "deliveryDelay": null
                    },
                    "prices": {
                        "wholesale": null,
                        "retail": null,
                        "brt1": null,
                        "brt2": null,
                        "brt3": null,
                        "brt4": null,
                        "brt5": null,
                        "brt6": null,
                        "brt75": null,
                        "brt10": null
                    },
                    "timestampCreated": null,
                    "timestampUpdated": null
                }
            },
        ]
        return  await Axios.get(process.env.VUE_APP_API_URL_CATALOG_BRANDS).then( res =>{
            commit("setDataAllParts",fakedata);
           console.log('мы в действиях получили ', res.data);
        })
    },

}

const getters = {

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ ПРОДУКТЫ
     * @param arr
     * @returns {[]}
     * @constructor
     */
    partsAllItems: arr => arr.all_parts,

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЮ ИНФОРМАЦИЮ ОБ ЭТОМ ПРОДУКТЕ ПО ИД
     * @param {Array} arr  - ваы
     * @return {Array} Вернёт всю инфу по конкретному продукту
     * @constructor
     * @enum {number}
     * @summary `await this.$store.getters["имяМодуля/имяГетера"](Аргументы)`
     * @description `await this.$store.getters["имяМодуля/имяГетера"](Аргументы)`
     */
    partsItemById: arr => id => {
        return arr.all_parts.find(todo => todo.productCard.id === id);
    },

    /// ### Текущие бренды этой запчасти
    currentBrandByPart: arr => arr.current_brands_by_parts,
    /// ### Текущие категории этой запчасти
    currentCategoriesByPart: arr => arr.current_categories_by_parts,
    /// ### Текущие применимости этой запчасти
    currentApplicabilitiesByPart: arr => arr.current_applicabilities_by_parts,


    /**
     * ###Получить из хранилища выбранные бренды
     * @param arr
     * @returns {[]}
     */
    selectedBrands: arr => arr.selected_brands,

    /**
     * ###Получить из хранилища выбранные категории
     * @param arr
     * @returns {[]}
     */
    selectedCategories: arr => arr.selected_categories,

    /**
     * ###Получить из хранилища выбранные применимости
     * @param arr
     * @returns {[]}
     */
    selectedApplicabilities: arr => arr.selected_applicabilities,

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
