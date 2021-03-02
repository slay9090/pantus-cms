
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
    // console.log(data)
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
                description: {
                    id: data.description ? data.description.id : null,
                    code: data.description ? data.description.code : null ,
                    aliases: data.description ? data.description.aliases : null,
                    description: data.description ? data.description.description : null
                }

            }
    // console.log(serialisationData)
    return serialisationData;

}

module.exports.catalogBrandDetail = catalogBrandDetail;

function catalogBrandsDescriptionsList (data) {


    return data.map(elem => {
        return {
            id: elem.id,
            code: elem.code,
            aliases: elem.aliases,
            description: elem.description,
        }
    })

}

module.exports.catalogBrandsDescriptionsList = catalogBrandsDescriptionsList;

function catalogBrandDescriptionDetail (elem) {

    // console.log(elem.aliases.split(','))

    return {

        id: elem.id,
        code: elem.code,
        aliases: elem.aliases.split(',').map(elem => {
            return parseInt(elem)
        }),
        description: elem.description,

    };

}

module.exports.catalogBrandDescriptionDetail = catalogBrandDescriptionDetail;

function catalogBrandDescriptionFormDataForSend (elem) {
    console.log('in add map', elem)
    return {
        code: elem.code,
        aliases: elem.aliases.toString(),
        description: elem.description,
    };
}

module.exports.catalogBrandDescriptionFormDataForSend = catalogBrandDescriptionFormDataForSend;
