import Axios from 'axios'


const state = () => ({
        state_products: [ ],
    state_product_brands: [],
    state_product_categories: [],
    state_product_applicabilities: [],
    select_product_categories: [],

})

const mutations = {
    SetDataProducts(state ,data){
        state.state_products = data;
    },
    SetDataProductBrands(state ,data){
        state.state_product_brands = data;
    },
    SetDataProductCategories(state ,data){
        state.state_product_categories = data;
    },
    SetDataProductApplicabilities(state ,data){
        state.state_product_applicabilities = data;
    },
    addItemSelectProductCategories(state, data){
        state.select_product_categories.push(data);
    },
    deleteItemSelectProductCategories(state, index){

        state.select_product_categories.splice(index, 1);
    }

}

const actions = {

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

    // действие получение Брэндов
    async GetDataProductBrands({commit}){
        return  await Axios.get('http://194.67.113.201:8080/brands').then( res =>{
            commit("SetDataProductBrands",res.data);
           // console.log('мы в действиях получили ', res.data);
        })
    },
    // получить категории
    async GetDataProductCategories({commit}){
        return  await Axios.get('http://194.67.113.201:8080/categories?view=tree').then( res =>{
            commit("SetDataProductCategories",res.data);
            // console.log('мы в действиях получили ', res.data);
        })
    },
    // получить применимости
    async GetDataProductApplicabilities({commit}){
        return  await Axios.get('http://194.67.113.201:8080/applicabilities?view=tree').then( res =>{
            commit("SetDataProductApplicabilities",res.data);
            // console.log('мы в действиях получили ', res.data);
        })
    },


}

const getters = {
    //получить весь массив
   // AllItems: arr => arr.state_data,

    ProductsItems: arr => arr.state_products,

    ProductBrands: arr => arr.state_product_brands,

    ProductCategories: arr => arr.state_product_categories,

    ProductApplicabilities: arr => arr.state_product_applicabilities,



    //получить продукт по ид (оменять когда добавит в апи /details?=123)
    ProductItemById: arr => id => {
        //  console.log('In store = ',state.state_data.find(todo => todo.id === id))
        return arr.state_products.find(todo => todo.productCard.id === id);
    },

    selectProductCategories: arr => arr.select_product_categories,

}
export  default {
    getters,
    actions,
    mutations,
    state,
    namespaced: true,
}
