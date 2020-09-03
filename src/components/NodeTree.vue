<template>
  <div class="node-tree">

    <a v-on:click="openFormEdit(node.id)" class="label font-weight-bold">{{ node.name }}</a>

    <a  v-if="node.children && node.children.length" v-b-toggle="node.id.toString()"  class="dropicn m-1 font-weight-bold"> > </a>

    <!-- Element to collapse -->
    <b-collapse :id="node.id.toString()">
     <ul> <node1 v-for="child in node.children" :node="child" :key="child.id"></node1> </ul>
    </b-collapse>

  </div>
</template>

<script>
export default {
  name: "node1",
  props: {
    node: Object
  },
  methods: {

    openFormEdit: function (datarow) {

      this.$router.push({ path: '/catalog/category/edit', query: { id: datarow } })

    },

  },

};
</script>

<style>
.dropicn { cursor: pointer; }
.label { cursor: default; }

</style>
