function crmOrderDetail (data) {
    let serialisationData = {};
    serialisationData =
        {
            id: data.id,
            userId: data.userId,
            userName:
                {
                    firstName: data.user.name.first,
                    lastName: data.user.name.last
                },
            userPhone: data.user.phone,
            price: data.price,
            orderStatus: data.status,
            delivery: {
                price: data.delivery.price,
                allow: data.delivery.allow,
                trackingCode: data.delivery.trackingCode,
                service: {
                    id: data.delivery.service.id,
                    name: data.delivery.service.name
                }
            },

            address: {
                city: data.address.city,
                detailed: data.address.detailed
            },
            paySystem: {
                id: data.paysystem.id,
                name: data.paysystem.name
            },
            payerType: {
                id: data.payerType.id,
                name: data.payerType.name,
            },
            comments: {
                admin: data.comments.admin,
                user: data.comments.user,
            },
            dates: {
                created: data.dates.created,
                modified: data.dates.modified,
                statusUpdate: data.dates.statusUpdate
            },
            offers: data.offers.map((item) => {
                return {
                    id: item.id,
                    guid: item.guid,
                    guidByOrder: item.guidByOrder,
                    name: item.name,
                    supplierCode: item.supplierCode,
                    price: item.price,
                    quantity: item.quantity,
                    priceTypeName: item.priceTypeName,

                }
            }),


        }

    console.log(serialisationData)
    return serialisationData;

}

module.exports.crmOrderDetail = crmOrderDetail;

function crmOrderStatuses (data) {
    const mapData = []
    data.forEach((elem, ) =>{
        mapData.push({
            code: elem.id,
            name: elem.name,
            description: elem.description
        })
    })
    return mapData;
}

module.exports.crmOrderStatuses = crmOrderStatuses;