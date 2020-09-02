<template>
  <div class="tree">
    <p class="tree-list">
      <node-tree   v-for="item in treeData" :node="item" :key="item.id" ></node-tree>
   </p>
  </div>
</template>

<script>

import NodeTree from "./NodeTree";

export default {
  props: {
    treeData: Array
  },
  components: {
    NodeTree
  }
};
</script>

<style>
/*.tree-list ul {*/
/*  padding-left: 16px;*/
/*  margin: 6px 0;*/
/*}*/
</style>
