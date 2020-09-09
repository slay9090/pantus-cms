<template>
  <div class="tree">
    <p class="tree-list">
      <node-tree  :url="url" v-for="item in treeData" :node="item" :key="item.id"></node-tree>
   </p>
  </div>
</template>

<script>

import NodeTree from "./NodeTree";

export default {
  props: {
    treeData: Array,
    url: String,

  },
  components: {
    NodeTree
  },
  computed: {
  },

  mounted() {
   // console.log(this.url)
  },




};
</script>

<style>
/*.tree-list ul {*/
/*  padding-left: 16px;*/
/*  margin: 6px 0;*/
/*}*/
</style>
