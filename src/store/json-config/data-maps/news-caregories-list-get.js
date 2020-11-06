function newsCategoriesItemList(data) {
    let serialisationData = [];
    data.forEach((elem,) => {

        serialisationData.push(
            {
                id: elem.id,
                code: elem.code,
                name: elem.name,

            }
        )

    });

    return serialisationData;

}

module.exports = newsCategoriesItemList;


// ПРИМЕР СЕРИАЛИЗОВАННЫЙ ФОРМАТ JSON

// {
//     "id": 5292,
//     "code": "obnovleniya-sayta",
//     "name": "Обновления сайта"
// },