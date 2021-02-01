<template>
  <b-container fluid>


    <b-row >

      <b-col class="mb-3 mb-lg-0" >

        <b-card header-tag="header">
          <template #header>
            <h4><small class="text-muted">Заказ</small></h4>
          </template>

          <b-card-text>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

              <b-form-group id="input-group-1" label="ID:" label-for="input-1">
                <b-form-input
                    readonly
                    id="input-1"
                    v-model="form.id"
                    required

                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Name:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.name"
                    required
                    placeholder="Enter brand name"
                    autofocus
                ></b-form-input>
              </b-form-group>



              <b-row class="button-group justify-content-between mt-4 mt-xl-0" align-v="end" >
                <b-col  >
                  <b-row class="unsave-button " cols-xl="2" align-v="end">
                    <b-col order="1" class="" xl="auto">
                      <b-button type="submit" variant="danger" class="">Удалить</b-button>
                    </b-col>
                    <b-col order="2" xl="auto" class="mt-3">
                      <b-button type="reset" variant="secondary"  class="">Сбросить</b-button>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col   class="text-right" >
                  <b-button type="submit" variant="primary" class="">Сохранить</b-button>
                </b-col>
              </b-row>


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

            <tree :url="url" :tree-data="treeById[0]"></tree>

          </b-card-text>
        </b-card>
      </b-col>

    </b-row>



<!--    -->





<!--    <div class="d-flex align-items-start">-->

<!--      <div class="card col-4 p-0  mr-5 shadow" id="tbl" >-->
<!--        <h4 class="card-header"> <small class="text-muted">Редактирование категорий</small></h4>-->
<!--        <div class="card-body">-->

<!--          <div>-->

<!--          </div>-->

<!--          <div class="card fluid p-0 my-5" id="tblres" >-->
<!--            <h4 class="card-header"> <small class="text-muted">Формализованный запрос</small></h4>-->
<!--            <div class="card-body">-->
<!--              <pre class="m-0">{{ form }}</pre>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="card col-4 p-0 ml-5 " id="treechild" >-->
<!--        <h4 class="card-header"> <small class="text-muted">Дочерние категории</small></h4>-->
<!--        <div class="card-body">-->

<!--        </div>-->
<!--      </div>-->

<!--    </div>-->

  </b-container>
</template>

<script>

import Tree from "@/components/catalog/catalog-tree-view/catalog-tree-view";

export default {
  props: ["query"],
  name: "CatalogApplicabilitiesFormEdit",

  components: {
    Tree
  },

  data() {

    return {
      form: {
        id: '',
        name: '',
      },
      // массив потомков
      treeById: [],
      // всё дерево
      tree: [],
      // показ кнопки резет
      show: true,
      url: '/catalog/applicabilities/edit?id=',
    }

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




    // получить все потомки айтема
    GetChildrenById  (list, id){
      list.forEach(element => {
        if(element.id === id) {
          //    console.log(element.children)
          this.treeById.push(element.children)

          this.form.name = element.name;
          this.form.id = element.id;
        }
        if (element.children) {
          this.GetChildrenById(element.children, id); // делаем то же самое для остальной части списка
        }
      });
    },

  },


  watch: {
    '$route' (){
    //  this.$store.dispatch("CatalogApplicabilities/getDataAllItems");
      let data = this.$store.getters["CatalogApplicabilities/allItems"];
      this.treeById = [] // Если убрать будет всё полное дерево детей этого узла всегда
      this.GetChildrenById(data ,Number(this.query))
    },
  },

  async mounted() {
    await this.$store.dispatch("CatalogApplicabilities/getDataAllItems");
    let data = await this.$store.getters["CatalogApplicabilities/allItems"];
    this.GetChildrenById(data ,Number(this.query))
  },

}
</script>

<style scoped>

</style>
