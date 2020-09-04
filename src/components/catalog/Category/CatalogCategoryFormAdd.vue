<template>
<div>

  <div class="d-flex align-items-start">

    <div class="card col-4 p-0  mr-5" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Создание категории</small></h4>
      <div class="card-body">

        <div>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">



            <b-form-group id="input-group-2" label="Name:" label-for="input-2">
              <b-form-input
                  id="input-2"
                  v-model="form.name"
                  required
                  placeholder="Enter brand name"
                  autofocus
              ></b-form-input>
            </b-form-group>
            <b-button type="reset" variant="secondary" class="mx-0">Сбросить</b-button>
            <b-button type="submit" variant="primary" class="pull-right">Создать</b-button>


          </b-form>
        </div>

        <div class="card fluid p-0 my-5" id="tblres" >
          <h4 class="card-header"> <small class="text-muted">Формализованный запрос</small></h4>
          <div class="card-body">
            <pre class="m-0">{{ form }}</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="card col-4 p-0 ml-5 " id="treechild" >
      <h4 class="card-header"> <small class="text-muted">Выбор директории </small></h4>
      <div class="card-body" v-on:click.prevent="select($event)">

         <tree :tree-data="tree"></tree>

      </div>
    </div>

  </div>

</div>
</template>

<script>

import Tree from "@/components/Tree";

export default {



name: "CatalogCategoryFormAdd",

  data: () => ({

    form: {
      name: '',
      parent_id: '',
      parent_name: '',
    },
    // массив потомков
    treeById: [],
    // всё дерево
    tree: [],
    // показ кнопки резет
    show: true,


  }),

  components: {
    Tree
  },

  async mounted() {
    await this.$store.dispatch("Category/Item" );
    let data = await this.$store.getters["Category/GetItem"];
    this.tree = data;

  },

  methods: {

    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },

    onReset(evt) {
      evt.preventDefault()
      // Trick to reset/clear native browser form validation state
      this.form.name = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    select: function(event) {
     // targetId = event.currentTarget.id;
      console.log('dfsdfdfsffffffff ', event.currentTarget); // returns 'foo'
    }





  },


}



</script>

<style scoped>

</style>
