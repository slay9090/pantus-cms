<template>

  <div>

    <div class="card" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Дерево категорий</small></h4>
      <div class="card-body">
        <tree :tree-data="tree"></tree>
      </div>
    </div>

  </div>

</template>

<script>

import Tree from "../components/Tree";

export default {

  data: () => ({
    tree: [],
  }),

  components: {
    Tree
  },

  async mounted() {
    await this.$store.dispatch("Category/Item" );
    let data = await this.$store.getters["Category/GetItem"];
    this.tree = data;

  },

  computed: {

  },

  methods: {

  },


};



</script>

<style scoped>

</style>
