<template>
  <div class="node-tree-all-node-mode">

    <b-form-checkbox
        @change="validations(node)"
        @input="collapse=!collapse"
        :id=node.id.toString()
        v-model="select"
        name="checkbox"
        :state="lastNode"
    >

      <span v-if="node.children&& node.children.length" class="font-weight-bold" > {{ node.name }} </span>
      <span v-else class="font-italic" > {{ node.name }} </span>
    </b-form-checkbox>

    <!-- Element to collapse -->
    <b-collapse v-if="node.children&& node.children.length&&collapse===true"  :visible="collapse">
      <ul> <catalog-tree-multi-filter-node v-for="child in node.children" :node="child" :key="child.id" ></catalog-tree-multi-filter-node> </ul>
    </b-collapse>
  </div>
</template>

<script>
export default {
name: "catalog-tree-multi-filter-node",
  props: {
    node: Object,
  },
  data() {
    return {
      collapse: false,
      lastNode: false,
      select: false,
    }
  },

  computed: {
    tempSelectedItems(){
      return this.$store.getters["TempDataCatalog/getTempValuesInputCatalog"](this.$store.getters["TempDataCatalog/idInput"])
    },
  },



  mounted() {
    this.setCheckBoxProperty(this.$store.getters["TempDataCatalog/parentsSelectedNodes"](this.$store.getters["TempDataCatalog/idInput"]));
    //console.log(this.$store.getters["TempDataCatalog/idInput"])
  },

  methods: {

    getAllChildrenByNode(node){
      let childrenArr =[]
      function addChildren (node){
        node.forEach( elem => {
          childrenArr.push(elem.id)
          if (elem.children && elem.children.length){
            addChildren (elem.children)
          }
        })
      }
      addChildren(node.children)
      return childrenArr
    },
    getAllParentsByNode(dataset, nodeId){
   // console.log('dataset',dataset)
      let parents = []
      var TreeModel = require('tree-model'),
          tree = new TreeModel();
      dataset.forEach(element => {
        let rootMain = tree.parse(element);
        rootMain.walk(function (node) {
          if (node.model.id === nodeId) {
            let x = node.getPath()
            x.forEach(element => {
              parents.push(element.model.id)

            })
          }
        })
      })

      let index = parents.indexOf(nodeId);
      parents.splice(index, 1);
      return parents
    },

    removeAllExcessItems(excessNode){
  //    console.log(excessNode)
      let index = []
     this.uncheckAllExcessItems(excessNode)
      excessNode.forEach( elem => {
        index = this.tempSelectedItems.findIndex(s => s.id === elem)
        if (index !== -1){
          this.$store.commit("TempDataCatalog/removeItemTempValue", {index: index, inputid: this.$store.getters["TempDataCatalog/idInput"]})
        }
      })
    },
    uncheckAllExcessItems (excessNode){
      excessNode.forEach(element => {
        if (document.getElementById(element.toString())) {
          document.getElementById(element.toString()).className = ''
          document.getElementById(element.toString()).style.display = 'none'
        }
      })
    },
    

    setCheckBoxProperty(paths){
      if (paths) {
     //   console.log(paths)
        paths.forEach(element => {
          // console.log('element', element)
          let lastElement = element[element.length - 1]
          element.forEach(element => {
            if (this.node.id === element) {
              this.select = false
              this.collapse = true // это рофл конечно, но @input="collapse=!collapse"
              this.lastNode=true

              if (element === lastElement) {
                this.select = true
                //this.lastNode = true
              }

            }
          })
        })
      }
    },





    // Отрефакторить, разделить на три функции валидация, запись и удаление вьюкс
    validations(node){
      if (node.children&& node.children.length){

        if (this.select===true){
          let index = this.tempSelectedItems.findIndex(s => s.id === node.id);
          this.$store.commit("TempDataCatalog/removeItemTempValue", {index: index, inputid: this.$store.getters["TempDataCatalog/idInput"]})
          this.removeAllExcessItems(this.getAllChildrenByNode(node))
         this.lastNode=false

        }

        if (this.select===false) {
          this.removeAllExcessItems(this.getAllParentsByNode(this.$store.getters["TempDataCatalog/getTempAllItemsCurrentFilter"](this.$store.getters["TempDataCatalog/idInput"]), node.id))
          this.removeAllExcessItems(this.getAllChildrenByNode(node))

          this.$store.commit('TempDataCatalog/addItemTempValue', {
            'key': this.$store.getters["TempDataCatalog/idInput"],
            'value': node
          })
          this.lastNode=true

        }
        else {
          //какой-то последний узел дерева выбран      //
        }

      }
      else
      {
        if (this.select===true){

          let index = this.tempSelectedItems.findIndex(s => s.id === node.id);
          this.$store.commit("TempDataCatalog/removeItemTempValue", {index: index, inputid: this.$store.getters["TempDataCatalog/idInput"]})
          this.lastNode=false

        }
        else {
          //какой-то последний узел дерева выбран      //
          this.$store.commit('TempDataCatalog/addItemTempValue', {
            'key': this.$store.getters["TempDataCatalog/idInput"],
            'value': node
          })
          this.lastNode=true
          this.removeAllExcessItems(this.getAllParentsByNode(this.$store.getters["TempDataCatalog/getTempAllItemsCurrentFilter"](this.$store.getters["TempDataCatalog/idInput"]), node.id))
          this.setCheckBoxProperty(this.$store.getters["TempDataCatalog/parentsSelectedNodes"](this.$store.getters["TempDataCatalog/idInput"]));
        }
      }
    },

  },
}
</script>

<style>
.node-tree-all-node-mode .custom-control-input.is-invalid:checked~.custom-control-label::before, .was-validated .custom-control-input:invalid:checked~.custom-control-label::before{
  border-color: #adb5bd ;
  background-color:#adb5bd ;

}
.node-tree-all-node-mode .custom-control-input.is-invalid~.custom-control-label::before, .was-validated .custom-control-input:invalid{
  border-color:#adb5bd ;

}
.node-tree-all-node-mode .custom-control-input.is-invalid~.custom-control-label, .was-validated .custom-control-input:invalid~.custom-control-label
{
  color: #424242;

}
.node-tree-all-node-mode .custom-control-input.is-invalid:focus:not(:checked)~.custom-control-label::before, .was-validated .custom-control-input:invalid:focus:not(:checked)~.custom-control-label::before {
  border-color: #adb5bd ;
}
.node-tree-all-node-mode .custom-control-input.is-invalid:focus~.custom-control-label::before, .was-validated .custom-control-input:invalid:focus~.custom-control-label::before {
  box-shadow: 0 0 0 0.2rem transparent ;
  border-color:#adb5bd ;
}
</style>