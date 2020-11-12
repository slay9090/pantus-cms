function catalogApplicabilitiesList(dataJson) {
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

module.exports = catalogApplicabilitiesList;


// JSON EXAMPLE:
//
//
//     // [
//     //     {
//     //         "id": 3138,
//     //         "parentId": null,
//     //         "name": "Lada (ВАЗ)",
//     //         "code": "zapchasti-vaz",
//     //         "level": 1,
//     //         "children": [
//     //             {
//     //                 "id": 4863,
//     //                 "parentId": 3138,
//     //                 "name": "Niva (Chevrolet)",
//     //                 "code": "niva-chevrolet",
//     //                 "level": 2,
//     //                 "children": [
//     //                     {
//     //                         "id": 4935,
//     //                         "parentId": 4863,
//     //                         "name": "2123",
//     //                         "code": "2123",
//     //                         "level": 3,
//     //                         "children": []
//     //                     }
//     //                 ]
//     //             },
//     //         ]
//     //     },
//     // ]