
function catalogBrandsList (data) {
    let serialisationData = [];
    data.forEach((elem, ) =>{

        serialisationData.push(
            {
                id: elem.id,
                name: elem.name,
                code: elem.code,
                cert: elem.cert !== null ? {
                    id:  elem.cert.id,
                    code: elem.cert.code,
                    img: elem.cert.img,
                    orientation: elem.cert.orientation,
                    description: elem.cert.description,
                } : null,

                contains_description: elem.contains_description,
                description_id: elem.description_id
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
                // description_id: data.description_id,
                cert: data.cert !== null ? {
                    id:  data.cert.id,
                    code: data.cert.code,
                    img: [data.cert.img],
                    orientation: data.cert.orientation,
                    description: data.cert.description,
                } : null,
                description: data.description

            }

    return serialisationData;

}

module.exports.catalogBrandDetail = catalogBrandDetail;

