function crmOrdersMapedList (data) {
    let serialisationData = { data: [], meta: []};
    // console.log(data);
    data.data.forEach((elem, ) =>{

        serialisationData.data.push(
            {
                id: elem.id,
                user: {
                    id: elem.user.id,
                    name: {
                        firstname: elem.user.name.first,
                        lastname: elem.user.name.last,
                    }
                },
                offersCount: elem.offersCount,
                price: elem.price,
                status: {
                    code: elem.status.code,
                    name: elem.status.name,
                },
                delivery: {
                    allow: elem.delivery.allow
                },
                address: {
                    city: elem.address.city,
                    detailed: elem.address.detailed,
                },
                date: elem.dates.modified,

            }
        )

    });
    serialisationData.meta = data.meta



    return serialisationData;

}

function crmOrdersMapedUrlFilter (urlParams) {
    const formattedUrl={};
    urlParams.page_number ? formattedUrl.page_number = urlParams.page_number : null
    urlParams.page_size ? formattedUrl.page_size = urlParams.page_size : formattedUrl.page_size='20'
    urlParams.sort_order ? formattedUrl.sort_order = urlParams.sort_order : formattedUrl.sort_order='desc'

    return formattedUrl;
}


module.exports.crmOrdersMapedList = crmOrdersMapedList;
module.exports.crmOrdersMapedUrlFilter = crmOrdersMapedUrlFilter;

// {
//     "id": 87,
//     "user": {
//     "id": 287,
//         "name": {
//         "first": "Ольга",
//             "last": "Фатина"
//     },
//     "phone": "+7 (927) 010-10-11"
// },
//     "offersCount": 1,
//     "price": 72.59,
//     "status": {
//     "code": "O",
//         "name": "Отправлен"
// },
//     "delivery": {
//     "price": 0,
//         "allow": false,
//         "trackingCode": null,
//         "service": {
//         "id": 2,
//             "name": "Транспортная компания «ПАНТУС»"
//     }
// },
//     "address": {
//     "city": "Хвалынск",
//         "detailed": "Ленина 50-501"
// },
//     "dates": {
//     "created": "2017-05-25 20:04:11",
//         "modified": "2017-05-25 22:04:03",
//         "statusUpdate": "2017-05-25 22:04:02"
// }
// },