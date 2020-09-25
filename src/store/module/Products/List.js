import Axios from 'axios'


const state = () => ({

    ///### Все продукты
    state_products: [ ],
    ///### Все бренды
    state_product_brands: [],
    ///### Все категории
    state_product_categories: [],
    ///### Все применимости
    state_product_applicabilities: [],
    ///### Выбранные бренды
    select_product_brands: [],
    ///### Выбранные категории
    select_product_categories: [],

})

const mutations = {


    /**
     * ЗАПИСАТЬ ВСЕ ПРОДУКТЫ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     * @constructor
     */
    SetDataProducts(state ,data){
        state.state_products = data;
    },


    /**
     * ЗАПИСАТЬ ВСЕ БРЕНДЫ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     * @constructor
     */
    SetDataProductBrands(state ,data){
        state.state_product_brands = data;
    },

    /**
     * ЗАПИСАТЬ ВСЕ КАТЕГОРИИ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     * @constructor
     */
    SetDataProductCategories(state ,data){
        state.state_product_categories = data;
    },


    /**
     * ЗАПИСАТЬ ВСЕ ПРИМЕНИМОСТИ В ХРАНИЛИЩЕ
     * @param state
     * @param data
     * @constructor
     */
    SetDataProductApplicabilities(state ,data){
        state.state_product_applicabilities = data;
    },


    /**
     * ДОБАВИТЬ ВЫБРАННЫЙ БРЕНД
     * @param state
     * @param data
     */
    addItemSelectProductBrands(state, data){
        state.select_product_brands.push(data);
    },


    /**
     * УДАЛИТЬ ВЫБРАННЫЙ БРЕНД
     * @param state
     * @param index
     */
    deleteItemSelectProductBrands(state, ){
        state.select_product_brands.splice();
    },




    /**
     * ДОБАВИТЬ ВЫБРАНую КАТЕГОРИю
     * @param state
     * @param data
     */
    addItemSelectProductCategories(state, data){
        state.select_product_categories.push(data);
    },

    /**
     * ###УДАЛИТЬ ВЫБРАННУЮ КАТЕГОРИЮ
     * @param state
     * @param index
     */
    deleteItemSelectProductCategories(state, index){
        state.select_product_categories.splice(index, 1);
    },

}

const actions = {

    /**
     * ###ПОЛУЧИТЬ ВСЕ ПРОДУКТЫ С БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     * @constructor
     */
    async GetDataProducts({commit}){
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
                        },
                        {
                            "id": 50961,
                            "parentId": 50971,
                            "code": null,
                            "name": "Пранк",
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
                        },
                        {
                            "id": 48201,
                            "parentId": 48191,
                            "code": null,
                            "name": "BMW",
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
                                "url": "http://www.pantus.ru/upload/iblock/eca/00034867ALT%20-%20Патрубки%20печки%20ВАЗ%201118%20-%20Ассоциация%20Балаковских%20Производителей%20Автозапчастей.jpg",
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
                    "timestampUpdated": "09.12.2015 14:50:25"
                },
                "productOffer": {
                    "id": null,
                    "bitrixId": null,
                    "active": null,
                    "productCardId": null,
                    "bitrixProductCardId": null,
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
                                "url": "http://www.pantus.ru/upload/iblock/eca/00034867ALT%20-%20Патрубки%20печки%20ВАЗ%201118%20-%20Ассоциация%20Балаковских%20Производителей%20Автозапчастей.jpg",
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
                    "bitrixProductCardId": null,
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
                                "url": "http://www.pantus.ru/upload/iblock/eca/00034867ALT%20-%20Патрубки%20печки%20ВАЗ%201118%20-%20Ассоциация%20Балаковских%20Производителей%20Автозапчастей.jpg",
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
                    "bitrixProductCardId": null,
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
        return  await Axios.get('http://194.67.113.201:8080/brands').then( res =>{
            commit("SetDataProducts",fakedata);
            console.log('мы в действиях получили ', res.data);
        })
    },


    /**
     * ###ПОЛУЧИТЬ ВСЕ БРЕНДЫ С БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     * @constructor
     */
    async GetDataProductBrands({commit}){
        return  await Axios.get('http://194.67.113.201:8080/brands').then( res =>{
            commit("SetDataProductBrands",res.data);
           // console.log('мы в действиях получили ', res.data);
        })
    },


    /**
     * ###ПОЛУЧИТЬ ВСЕ КАТЕГОРИИ С БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     * @constructor
     */
    async GetDataProductCategories({commit}){
        return  await Axios.get('http://194.67.113.201:8080/categories?view=tree').then( res =>{
            commit("SetDataProductCategories",res.data);
            // console.log('мы в действиях получили ', res.data);
        })
    },

    /**
     * ###ПОЛУЧИТЬ ВСЕ ПРИМЕНИМОСТИ С БД
     * @param commit
     * @returns {Promise<AxiosResponse<any>>}
     * @constructor
     */
    async GetDataProductApplicabilities({commit}){
        return  await Axios.get('http://194.67.113.201:8080/applicabilities?view=tree').then( res =>{
            commit("SetDataProductApplicabilities",res.data);
            // console.log('мы в действиях получили ', res.data);
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
    ProductsItems: arr => arr.state_products,

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ БРЕНДЫ
     * @param arr
     * @returns {[]}
     * @constructor
     */
    ProductBrands: arr => arr.state_product_brands,

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ КАТЕГОРИИ
     * @param arr
     * @returns {[]}
     * @constructor
     */
    ProductCategories: arr => arr.state_product_categories,

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЕ ПРИМЕНИМОСТИ
     * @param arr
     * @returns {[]}
     * @constructor
     */
    ProductApplicabilities: arr => arr.state_product_applicabilities,

    /**
     * ###ПОЛУЧИТЬ ИЗ ХРАНИЛИЩА ВСЮ ИНФОРМАЦИЮ ОБ ЭТОМ ПРОДУКТЕ ПО ИД
     * @param {Array} arr  - ваы
     * @return {Array} Вернёт всю инфу по конкретному продукту
     * @constructor
     * @enum {number}
     * @summary A concise summary.
     * @description `await this.$store.getters["имяМодуля/имяГетера"](Аргументы)`
     */
    ProductItemById: arr => id => {
        //  console.log('In store = ',state.state_data.find(todo => todo.id === id))
        return arr.state_products.find(todo => todo.productCard.id === id);
    },

    /**
     * ###Получить из хранилища выбранные бренды
     * @param arr
     * @returns {[]}
     */
    selectProductBrand: arr => arr.select_product_brands,

    /**
     * ###Получить из хранилища выбранные категории
     * @param arr
     * @returns {[]}
     */
    selectProductCategories: arr => arr.select_product_categories,

}

export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
