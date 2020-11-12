
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

module.exports = catalogBrandsList;

// JSON EXP:
//
//     [
//         {
//             "id": 255,
//             "name": "AMT прокладки",
//             "code": "amtprokladki"
//         },
// }