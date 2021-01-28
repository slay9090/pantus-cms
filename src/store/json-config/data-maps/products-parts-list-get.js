

function productsPartsItemsList (data) {
    let serialisationData = {data:[], meta: {}};

    data.data.forEach((elem, ) =>{
        serialisationData['data'].push(

                    {


                        id: elem.id,
                        guid: elem.guid,
                        name: elem.name,

                        images: {
                            main: {
                                url: elem.images.main,
                            },
                            album: {
                                url: elem.images.extra,
                            }
                        },

                        sku: {
                            origin: elem.sku.origin,
                            custom: elem.sku.custom,
                        },

                        brand: {
                            id: elem.brand.id,
                            name: elem.brand.name,
                            code: elem.brand.code,
                            deliveryDelay: elem.brand.deliveryDelay
                        },


                        categories: elem.categories.map(function (item) {
                            return {
                                id: item.id,
                                name: item.name
                            }
                        }),

                        applicabilities: elem.applicabilities.map(function (item) {
                            return {
                                id: item.id,
                                name: item.name
                            }
                        }),


                        oems: elem.oems.map(function (item) {
                            return item
                        }),

                        dates: {
                            created: elem.dates.created,
                            modified: elem.dates.modified,
                            release: elem.dates.release
                        },

                        params: {
                            material: elem.params.material,
                            length: elem.params.length,
                            width: elem.params.width,
                            height: elem.params.height,
                            weight: elem.params.weight,
                            measure: elem.params.measure
                        },

                        offers: elem.offers.map(function (item) {
                            return {
                                id: item.id,
                                guid: item.guid,
                                name: item.name,
                                activity: item.activity,
                                quantity: item.quantity,
                                price: item.price,
                                productId: item.productId,

                                supplier: {
                                    code: item.supplier.code,
                                    name: item.supplier.name,
                                    itemId: item.supplier.itemId,
                                    storehouse: item.supplier.storehouse,
                                    deliveryDelay: item.supplier.deliveryDelay,
                                    orderMultiplicity: item.supplier.orderMultiplicity
                                },

                                dates: {
                                    created: item.dates.created,
                                    modified: item.dates.modified
                                },

                            }
                        }),

                    }
        )

    });

    serialisationData['meta'] = {
        count: data.meta.count
    }

    return serialisationData;

}

function urlMapFilterPartsGetList (urlParams) {



    const formattedUrl={};

    urlParams.filter_substr ? formattedUrl.filter_substr = urlParams.filter_substr : null
    urlParams.filter_brands && urlParams.filter_brands > 0 ? formattedUrl.filter_brands = urlParams.filter_brands : null
    urlParams.filter_categories ? formattedUrl.filter_categories =  urlParams.filter_categories : null
    urlParams.filter_applicabilities ? formattedUrl.filter_applicabilities = urlParams.filter_applicabilities : null
    urlParams.page_number ? formattedUrl.page_number = urlParams.page_number : null
    urlParams.page_size ? formattedUrl.page_size = urlParams.page_size : formattedUrl.page_size = '20'



    return formattedUrl;

}

module.exports.urlMapFilterPartsGetList = urlMapFilterPartsGetList;
module.exports.productsPartsItemsList = productsPartsItemsList;



// ПРИМЕР СЕРИАЛИЗОВАННЫЙ ФОРМАТ JSON

// http://api.pantus.ru/products_filter?
// filter_substr=name
// filter_brands=924,925
// filter_categories=3059,3060
// filter_applicabilities=4929,4930
// page_number=1
// page_size=1
// view=count - посчитать кол-во запчастей



// [
//     {
//         "id": 55168,
//         "guid": "F82DC3DF-D880-4581-AE26-C80850A2623E",
//         "barcode": null,
//         "activity": true,
//         "name": "Прокладка бензонасоса ВАЗ 21082 силикон синий",
//         "supplierMaintainer": null,
//         "images": {
//             "main": "http://www.pantus.ru/upload/iblock/ed2/10034697ASP%20-%20Прокладка%20бензонасоса%20ВАЗ%2021082%20силикон%20синий%20-%20A-Sport.jpg",
//             "extra": []
//         },
//         "storehouse": "Дальний",
//         "sku": {
//             "origin": "10034697ASP",
//             "custom": "10034697asp"
//         },
//         "brand": {
//             "id": 710,
//             "name": "A-Sport",
//             "deliveryDelay": "0"
//         },
//         "categories": [
//             {
//                 "id": 271,
//                 "name": "Кольца"
//             },
//             {
//                 "id": 264,
//                 "name": "РТИ"
//             }
//         ],
//         "applicabilities": [
//             {
//                 "id": 3138,
//                 "name": "Lada (ВАЗ)"
//             },
//             {
//                 "id": 4925,
//                 "name": "2108"
//             },
//             {
//                 "id": 4926,
//                 "name": "2109"
//             },
//             {
//                 "id": 4927,
//                 "name": "21099"
//             },
//             {
//                 "id": 4928,
//                 "name": "Samara"
//             }
//         ],
//         "params": {
//             "material": null,
//             "length": null,
//             "width": null,
//             "height": null,
//             "weight": "0",
//             "measure": "шт"
//         },
//         "oems": [
//             "21082-1101138",
//             "21082-1101138-00",
//             "21082-1101138СИНA-sport",
//             "210821101138",
//             "21082110113800"
//         ],
//         "dates": {
//             "created": "19.05.2016 19:25:15",
//             "modified": "21.11.2020 19:28:04",
//             "release": "31.12.2016"
//         },
//         "offers": [
//             {
//                 "id": 74397,
//                 "guid": "F82DC3DF-D880-4581-AE26-C80850A2623E#F82DC3DF-D880-4581-AE26-C80850A26231",
//                 "name": "кольцо бензонасоса 21083-1101138 СИЛИКОН СИНИЙ A-sport",
//                 "activity": true,
//                 "quantity": 159,
//                 "price": 42.87,
//                 "productId": 55168,
//                 "supplier": {
//                     "code": null,
//                     "name": "Пантус",
//                     "itemId": null,
//                     "storehouse": null,
//                     "deliveryDelay": "Сегодня",
//                     "orderMultiplicity": null
//                 },
//                 "dates": {
//                     "created": "19.05.2016 19:42:42",
//                     "modified": "21.11.2020 19:54:49"
//                 }
//             }
//         ]
//     }
// ]