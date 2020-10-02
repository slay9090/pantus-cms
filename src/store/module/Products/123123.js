let dataset = [
    {
        "id": 456,
        "name": "Name1",
        "children": [
            {
                "id": 3111,
                "name": "Name1.1",
                "children": [
                        {
                            "id": 504,
                            "name": "Name1.1.1",
                            "children": [
                                {
                                    "id": 509,
                                    "name": "Name1.1.1.1",
                                    "children": []
                                },
                            ]
                        },
                ]
            },
            {
                "id": 3120,
                "name": "Name1.2",
                "children": [
                    {
                        "id": 877,
                        "name": "Name1.2.1",
                        "children": []
                    },
                ]
            },
            {
                "id": 31209,
                "name": "Name1.3",
                "children": [
                    {
                        "id": 8779,
                        "name": "Name1.3.1",
                        "children": []
                    },
                ]
            },
        ]
    },
    {
        "id": 456,
        "name": "Name2",
        "children": [
            {
                "id": 50,
                "name": "Name2.1",
                "children": []
            },
        ]
    },
]

/**
 * Вернуть всех родителей конкретного узла
 * @param dataset - набор данных
 * @param nodeId - ид узла
 * @returns {[]} - родители
 */
function getAllParentThisNode(dataset, nodeId)
{
    let parents = []
    dataset.forEach(element => {
        var TreeModel = require('tree-model'),
            tree = new TreeModel(),
            rootMain = tree.parse(element);
                rootMain.walk(function (node) {
                    if (node.model.id === nodeId) {
                        let x = node.getPath()
                        x.forEach(element => {
                            parents.push(element.model.name)
                            }
                        )
                    }
                });
    })
    return parents
}

console.log(getAllParentThisNode(dataset, 877))

