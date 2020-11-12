function catalogCategoriesList(dataJson) {
    let serialisationData = [];
    function treeData(dataArr, serialisationData) {
        dataArr.forEach((elem, index) => {
            serialisationData.push(
                {
                    id: elem.id,
                    parentId: elem.parentId,
                    name: elem.name,
                    code: elem.code,
                    level: elem.depthLevel,
                    children: [],
                }
            )
            // Р - рекурсия, чекаем есть ли чилдрены, если есть, то вызываем себя же и кормим функции сами эти чилдрены, (нам они не интересны) -
            // !!! а записываем в пустое созданное ранее свойтсво children: [] это serialisationData[index].children !!!
            //
            // где serialisationData - это уже массив с
            //
            // id: 234234,
            // parentId: null,
            // name: testetstststts,
            // code: testetstststts,
            // level: 0,
            // children: []
            //
            // [index] - срез данных, номер итерации
            // .children - адрес (поле) массива куда пишем elem.childs
            if (elem.childs && elem.childs.length > 0) {
                treeData(elem.childs, serialisationData[index].children);
            }

        });
    }

    treeData(dataJson, serialisationData);
    return serialisationData;
}

module.exports = catalogCategoriesList;


// JSON EXAMPLE:
//
//
// [
//     {
//         "id": 264,
//         "parentId": null,
//         "name": "РТИ",
//         "code": "rti",
//         "level": 1,
//         "children": [
//             {
//                 "id": 265,
//                 "parentId": 264,
//                 "name": "Ремни приводные",
//                 "code": "remni",
//                 "level": 2,
//                 "children": []
//             },
//             {
//                 "id": 266,
//                 "parentId": 264,
//                 "name": "Пыльники",
//                 "code": "pylniki",
//                 "level": 2,
//                 "children": [
//                     {
//                         "id": 3009,
//                         "parentId": 266,
//                         "name": "Пыльники шруса",
//                         "code": "pylniki_shrusa",
//                         "level": 3,
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "id": 267,
//                 "parentId": 264,
//                 "name": "Буферы",
//                 "code": "bufery",
//                 "level": 2,
//                 "children": []
//             },
//
//         ]
//     },
// ]