<template>
  <b-container>


    <b-row>

      <b-col >

        <b-card header-tag="header">
          <template #header>
            <h4><small class="text-muted">Заказ</small></h4>
          </template>

          <b-card-text>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">



              <b-form-group id="input-group-2" label="Название:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.name"
                    required
                    placeholder="Введите тут название"
                    autofocus
                ></b-form-input>
              </b-form-group>

              <b-button type="reset" variant="secondary" class="mx-0">Сбросить</b-button>
              <b-button type="submit" variant="primary" class="pull-right">Создать</b-button>


            </b-form>
            <hr>
            <pre class="m-0">{{ form }}</pre>

          </b-card-text>

        </b-card>

      </b-col>


      <b-col >
        <b-card header-tag="header">
          <template #header>
            <h4><small class="text-muted">Позиции</small></h4>
          </template>
          <b-card-text>

            <div class="card-body" v-on:click.prevent="select($event)" >

              <a :href="'catalog/applicabilities/edit?id=null'" class="label font-weight-bold" :myid="'null'" :myname="'root'">Корневая</a>
              <hr>
              <tree :tree-data="tree "></tree>
            </div>
          </b-card-text>
        </b-card>
      </b-col>

    </b-row>

  </b-container>
</template>

<script>

import Tree from "@/components/catalog/catalog-tree-view/catalog-tree-view";

export default {



  name: "CatalogApplicabilitiesFormAdd",

  data: () => ({

    form: {
      name: '',
      parent_id: '',
      parent_name: '',
    },
    activeLink: null,
    // массив потомков
    treeById: [],
    // всё дерево
    tree: [],
    // показ кнопки резет
    show: true,
    target: null,


  }),

  components: {
    Tree
  },

  async mounted() {
    await this.$store.dispatch("CatalogApplicabilities/getDataAllItems" );
    let data = await this.$store.getters["CatalogApplicabilities/allItems"];
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

      if (this.target===null) {
        this.target = event.target ;
      }
      this.target.style.color = '#047cff';
      this.target = event.target ;
      this.target.style.color = 'red';
      //console.log(event.target.getAttribute('myid'));
      //console.log(event.target.getAttribute('myname'));

      this.form.parent_id=event.target.getAttribute('myid')
      this.form.parent_name=event.target.getAttribute('myname')

    },

  },


}



</script>

<style scoped>

</style>
