<template>

  <div>
    <tree :tree-data="tree"></tree>
  </div>

</template>

<script>

import Tree from "../components/Tree";

export default {
  data: () => ({

    tree:
    [
      {
        "id": 456,
        "parentId": null,
        "code": "avtoaksessuary",
        "name": "Автоаксессуары",
        "lft": 1,
        "rght": 10,
        "treeId": 1,
        "level": 0,
        "children": [
          {
            "id": 3111,
            "parentId": 456,
            "code": "zhilety_svetootrazhayushchie",
            "name": "Жилеты светоотражающие",
            "lft": 2,
            "rght": 3,
            "treeId": 1,
            "level": 1,
            "children": [
              {
                "id": 442,
                "parentId": 441,
                "code": "komplektuyushchie_dlya_startera",
                "name": "Комплектующие для стартера",
                "lft": 55,
                "rght": 56,
                "treeId": 5,
                "level": 2,
                "children": []
              }
            ]
          },
          {
            "id": 3120,
            "parentId": 456,
            "code": "ognetushiteli",
            "name": "Огнетушители",
            "lft": 4,
            "rght": 5,
            "treeId": 1,
            "level": 1,
            "children": []
          },
          {
            "id": 451,
            "parentId": 456,
            "code": "utepliteli",
            "name": "Утеплители",
            "lft": 8,
            "rght": 9,
            "treeId": 1,
            "level": 1,
            "children": []
          },
          {
            "id": 11,
            "parentId": 456,
            "code": "тест",
            "name": "тест",
            "lft": 6,
            "rght": 7,
            "treeId": 1,
            "level": 1,
            "children": []
          }
        ]
      },
      {
        "id": 4567,
        "parentId": null,
        "code": "avtoaksessuary",
        "name": "ROOT2",
        "lft": 1,
        "rght": 10,
        "treeId": 1,
        "level": 0,
        "children": []
      },
    ]

  }),
  components: {
    Tree
  }
};
</script>

<style scoped>

</style>
