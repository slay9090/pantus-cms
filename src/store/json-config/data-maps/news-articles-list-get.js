

function newsArticleItemList (data) {
let serialisationData = [];
    data.forEach((elem, ) =>{

        serialisationData.push(
            {
                id: elem.id,
                name: elem.name,
                activity: elem.name,

                preview: {
                    image: elem.preview.image,
                    text: elem.preview.text
                },

                content: elem.content,

                category: {
                    id: elem.category.id,
                    code: elem.category.code,
                    name: elem.category.name,
                },
                dates: {
                    created: elem.dates.created,
                    updated: elem.dates.updated,
                    active_from: elem.dates.active_from,
                },

            }
        )

    });

    return serialisationData;

}

module.exports = newsArticleItemList;


// ПРИМЕР СЕРИАЛИЗОВАННЫЙ ФОРМАТ JSON

//[
// {
//     "id": 5,
//     "name": " Новинки ассортимента Декабрь",
//     "activity": true,
//     "preview": {
//     "image": null,
//         "text": "Новые поступления запчастей в декабре 2015 года"
// },
//     "content": null,
//     "category": {
//     "id": 5297,
//         "code": "novinki",
//         "name": "Новинки"
// },
//     "dates": {
//     "created": "09.12.2015 14:50:25",
//         "updated": "25.07.2019 12:11:39",
//         "active_from": "01.12.2016"
// }
// },
//],