function crmOrderDetail (data) {
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

module.exports = crmOrderDetail;