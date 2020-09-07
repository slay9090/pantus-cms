<template>
  <div class="node-tree" >
    <a :href="url + node.id" class="label font-weight-bold" :myid="node.id" :myname="node.name" >{{ node.name }}</a>
    <a  v-if="node.children && node.children.length" v-b-toggle="node.id.toString()"  class="dropicn m-1 font-weight-bold"> > </a>
    <!-- Element to collapse -->
    <b-collapse :id="node.id.toString()">
     <ul> <node1 v-for="child in node.children" :node="child" :key="child.id" :url="url"></node1> </ul>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "node1",
  props: {
    url: String,
    node: Object,
  },

  data() {
    return {
    }
  },

  created() {

  },


  mounted() {

  }
};
</script>

<style>
.dropicn { cursor: pointer; }
.label { cursor: default; }

</style>
