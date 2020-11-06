
function newsArticleItemDetail (data) {
    let serialisationData = [];
    serialisationData.push(
        {
            id: data.id,
            name: data.name,
            activity: data.name,

            preview: {
                image: data.preview.image,
                text: data.preview.text
            },
            content: data.content,

            category: {
                id: data.category.id,
                code: data.category.code,
                name: data.category.name,
            },
            dates: {
                created: data.dates.created,
                updated: data.dates.updated,
                active_from: data.dates.active_from,
            },

        }
    )

    return serialisationData;

}

module.exports = newsArticleItemDetail;




// {
//     "id": 159015,
//     "name": "Контроль над дорогой: амортизаторы",
//     "activity": true,
//     "preview": {
//              "image": "http://www.pantus.ru/upload/iblock/5e8/Амортизатор.jpg",
//              "text": "Контроль над машиной дается труднее, а даже на маленькой кочке транспорт буквально подпрыгивает. Вероятно, из строя вышел амортизатор. Потеря комфорта – лишь часть проблемы. На кону – безопасность. Ведь с помощью амортизаторов обеспечивается постоянное сцепление с полотном. Без чего управлять машиной трудно."
// },
//     "content": "<h3> Контроль над дорогой: амортизаторы</h3>\r\n<p>\r\n\t Контроль ",
//     "category": {
//          "id": 5298,
//         "code": "interesnoe",
//         "name": "Интересное"
// },
//     "dates": {
//          "created": "11.04.2018 11:08:35",
//         "updated": "25.07.2019 12:04:56",
//         "active_from": "09.04.2018 00:08:00"
// }
// }