<template>
  <div class="node-tree " >


    <b-form-checkbox
        @input="collapse=!collapse"
        :id=node.id.toString()
        v-model="select"
        name="checkbox"

        :state="lastNode"
        @change="validations(node)"
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
    itemSelectProductCategories(){
      return this.$store.getters["ProductParts/selectedCategories"]
    },


  },

  methods: {
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

            let index = this.itemSelectProductCategories.findIndex(s => s.id === node.id);
            console.log(index)

            this.$store.commit("ProductParts/deleteItemSelectedCategories", index)

            this.lastNode=false

          }
          else {
            //какой-то последний узел дерева выбран
            //

            this.$store.commit("ProductParts/addItemSelectedCategories", node);

           // console.log('какой-то последний узел дерева выбран ', this.selectData)
          }
        }
    },


  },
  watch: {

  }

}
</script>

<style>
.custom-control-input.is-invalid:checked~.custom-control-label::before, .was-validated .custom-control-input:invalid:checked~.custom-control-label::before{
  border-color: #adb5bd;
  background-color:#adb5bd;

}
.custom-control-input.is-invalid~.custom-control-label::before, .was-validated .custom-control-input:invalid{
  border-color:#adb5bd;

}
.custom-control-input.is-invalid~.custom-control-label, .was-validated .custom-control-input:invalid~.custom-control-label
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
