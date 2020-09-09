
<template>

  <div class="home">

    <div class="card" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Редактор новостей</small></h4>
      <div class="card-body">
        <ul>
          <div>
            <div class="py-3 d-flex  align-items-center">
              <div class="flex-grow-1 d-flex">
                <b-form-input size="sm" class="col-3 py-3"
                              v-model="filter"
                              type="search"
                              id="filterInput"
                              placeholder="Type to Search"
                ></b-form-input>
                <b-button class="ml-3 py-1" :disabled="!filter" @click="filter = ''">Clear</b-button>
              </div>
              <div class="p-2 px-1">
                <b-button variant="outline-danger" class="py-1 mx-2" :disabled="selected.length == 0">Удалить</b-button>
                <b-button variant="outline-success" class="py-1 ">Создать</b-button>
              </div>

            </div>


            <b-table
                ref="selectableTable"
                selectable
                select-mode="single"
                selected-variant="warning"



                @row-selected="onRowSelected"
                id="my-table"
                :items="itemDataTab"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                sort-icon-left
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"
                head-variant="light"
                small
            >

              <template v-slot:cell(selected)="{ rowSelected }">
                <template  v-if="rowSelected">
                  <span  aria-hidden="true">&check;</span>

                </template>
                <template  v-else>
                  <span  aria-hidden="true">&nbsp;</span>

                </template>
              </template>


              <template v-slot:cell(name)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->
                <a v-on:click="openFormEdit(data.item)"  class="mb-0" >{{ data.value }} </a>
              </template>


            </b-table>

            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>

            <p class="mt-3">Current Page: {{ currentPage }}</p>

          </div>
          <div>
            <p>
              Selected Rows:<br>
              {{ selected }}
            </p>
          </div>
        </ul>
      </div>
    </div>


    <router-view></router-view>
  </div>


</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',

  data() {
    return {
      perPage: 20, // кол-во строк на 1й стр
      currentPage: 1,

      sortBy: 'age',
      sortDesc: false,

      filter: null,

      selected: [],

      itemDataTab: [],



      fields: [
        { key: 'selected', label: '',  thStyle: {  width: '50px' }},
        { key: 'id',  sortable: true ,   },
        { key: 'name', sortable: true , },
      ],

      show: true,

    }
  },

  methods:{
    onRowSelected(items) {
      this.selected = items
    },
    openFormEdit: function (datarow) {

      this.$router.push({ path: '/catalog/brands/edit', query: { id: datarow.id } })

    },
  },

  components: {
  },
  computed: {


    rows() {
      return this.itemDataTab.length
    }

  },
  async mounted() {
    await this.$store.dispatch("CatalogBrands/GetData");
    let data = await this.$store.getters["CatalogBrands/AllItems"];
    //console.log(data)
    this.itemDataTab = data;
  }

}

</script>

<style scoped>

</style>
