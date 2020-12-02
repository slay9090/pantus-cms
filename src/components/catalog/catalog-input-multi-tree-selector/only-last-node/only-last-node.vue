<template>
  <div class="node-tree" >


    <b-form-checkbox
        class="label-catalog"
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
      <ul> <check-box-tree v-for="child in node.children" :node="child" :key="child.id" ></check-box-tree> </ul>
    </b-collapse>
  </div>

</template>

<script>
export default {
name: "CheckBoxTree",
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


    this.$store.getters["TempDataCatalog/parentsSelectedNodes"](this.$store.getters["TempDataCatalog/idInput"]).forEach(element => {
      let lastElement=element[element.length - 1]
      element.forEach(element => {
        if(this.node.id === element)
        {
          this.select = true
          this.collapse = false // это рофл конечно, но @input="collapse=!collapse"

          if (element === lastElement){
            this.lastNode = true
          }

        }
      })
    })
  },

  methods: {
    // Отрефакторить, разделить на три функции валидация, запись и удаление вьюкс
    validations(node){

      if (node.children&& node.children.length){
        //если есть чилдрен, то не последний узел дерева
        this.lastNode=false

      }
      else
        {
          //иначе последний узел дерева
          this.lastNode=true

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

          }
        }
    },






  },





}
</script>

<style scoped>
.node-tree .custom-control-input.is-invalid:checked~.custom-control-label::before, .was-validated .custom-control-input:invalid:checked~.custom-control-label::before{
  border-color: #adb5bd;
  background-color:#adb5bd;

}
.node-tree .custom-control-input.is-invalid~.custom-control-label::before, .was-validated .custom-control-input:invalid{
  border-color:#adb5bd;

}
.node-tree .custom-control-input.is-invalid~.custom-control-label, .was-validated .custom-control-input:invalid~.custom-control-label
{
  color: #212529;

}
.custom-control-input.is-invalid:focus:not(:checked)~.custom-control-label::before, .was-validated .custom-control-input:invalid:focus:not(:checked)~.custom-control-label::before {
  border-color: #adb5bd;
}
.custom-control-input.is-invalid:focus~.custom-control-label::before, .was-validated .custom-control-input:invalid:focus~.custom-control-label::before {
   box-shadow: 0 0 0 0.2rem transparent;
  border-color:#adb5bd;
}


</style>
