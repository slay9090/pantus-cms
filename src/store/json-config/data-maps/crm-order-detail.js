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
            userType:
                {
                    id: data.user.type.id,
                    name: data.user.type.name,
                },
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

function crmOrderDeliveryServises (data) {
    const mapData = []
    data.forEach((elem, ) =>{
        mapData.push({
            id: elem.id,
            name: elem.name,
            active: elem.active,
            sort: elem.sort,
            description: elem.description,

        })
    })

    return mapData;
}

module.exports.crmOrderDeliveryServises = crmOrderDeliveryServises;

function crmOrderPaySystems (data) {
    const mapData = []
    data.forEach((elem, ) =>{
        mapData.push({
            id: elem.id,
            name: elem.name,
            active: elem.active,
            sort: elem.sort,
            description: elem.description,

        })
    })

    return mapData;
}

module.exports.crmOrderPaySystems = crmOrderPaySystems;

function crmOrderTreeConformity (data) {
    const mapData = []
    data.forEach((elem, ) =>{
        mapData.push({
            user_type_id: elem.user_type_id,
            delivery_type_id: elem.delivery_type_id,
            paysystem_type_id: elem.paysystem_type_id,


        })
    })

    return mapData;
}

module.exports.crmOrderTreeConformity = crmOrderTreeConformity;


////////////////////////////////////
// Отправка
////////////////////////////////////

function crmOrderFormDataForSend (data) {

    //      "status_id": "N",
    //     "payment_service_id": 1,
    //     "delivery_service_id": 8,
    //     "delivery_price": 1000,
    //     "tracking_number": 22222,
    //     "allow_delivery": false,
    //     "allow_pay": true

      const  mapData = {
          status_id: data.orderStatus.code,
          delivery_price : data.delivery.price ? Number(data.delivery.price.replace(/₽ /g,'').replace(/,/g,'')) : 0,
          tracking_number: data.delivery.trackingCode ? data.delivery.trackingCode : '',
          allow_delivery: data.delivery.allow,
        }
        data.paySystem.active ? mapData.payment_service_id=data.paySystem.id : null
        data.delivery.service.active ? mapData.delivery_service_id=data.delivery.service.id : null

    return mapData;
}

module.exports.crmOrderFormDataForSend = crmOrderFormDataForSend;