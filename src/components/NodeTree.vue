<template>
  <div class="node-tree">




<!--    <b-dropdown v-if="node.children && node.children.length" id="dropdown-1" text="" class=""> {{ node.name }}-->
<!--      <node1 v-for="child in node.children" :node="child" :key="child.id"></node1>-->
<!--    </b-dropdown>-->
    <span class="label">{{ node.name }}</span>

    <a v-if="node.children && node.children.length" v-b-toggle="node.id.toString()"  class="m-1"> > </a>

    <!-- Element to collapse -->
    <b-collapse :id="node.id.toString()">
     <ul> <node1 v-for="child in node.children" :node="child" :key="child.id"></node1> </ul>
    </b-collapse>


<!--    <ul v-if="node.children && node.children.length"> >>>-->
<!--      <node1 v-for="child in node.children" :node="child" :key="child.id"></node1>-->
<!--    </ul>-->
  </div>
</template>

<script>
export default {
  name: "node1",
  props: {
    node: Object
  }
};
</script>
