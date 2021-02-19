
function catalogBrandsList (data) {
    let serialisationData = [];
    data.forEach((elem, ) =>{

        serialisationData.push(
            {
                id: elem.id,
                name: elem.name,
                code: elem.code,

            }
        )

    });

    return serialisationData;

}

module.exports.catalogBrandsList = catalogBrandsList;

function catalogBrandDetail (data) {
    let serialisationData = {};

    serialisationData =
            {
                id: data.id,
                name: data.name,
                code: data.code,
                active: data.contains_description,
                description: data.description,

            }
    return serialisationData;

}

module.exports.catalogBrandDetail = catalogBrandDetail;



// JSON EXP:
//
//     [
//         {
//             "id": 255,
//             "name": "AMT прокладки",
//             "code": "amtprokladki"
//         },
// }