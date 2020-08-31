<template>

  <div class="home">



<!--    {{ doneTodosCount }}-->
<!--    <hr>-->
<!--    {{ items }}-->




    <div class="card" id="tbl" >
      <h4 class="card-header"> <small class="text-muted">Редактор новостей</small></h4>
      <div class="card-body">
        <ul>
          <div>
            <div class="py-3 d-flex">
              <b-form-input size="sm" class="col-5"
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Type to Search"
              ></b-form-input>
              <b-button class="ml-3" size="sm" :disabled="!filter" @click="filter = ''">Clear</b-button>


            </div>


            <b-table
                ref="selectableTable"
                selectable
                select-mode="single"
                @row-selected="onRowSelected"

                id="my-table"
                :items="itemsTabData"
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










<!--    <button @click="data2">ОТПРАВИТЬ</button>-->
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

      fields: [
        { key: 'id', sortable: true },
        { key: 'name', sortable: true },
      ],

      show: true,

    }
  },

  methods:{
    onRowSelected(items) {
      this.selected = items
    },
    openFormEdit: function (datarow) {
     // this.show = !this.show

    this.$router.push({ path: 'catalog/brands/edit', query: { id: datarow.id } })

     // console.log(datarow.id)

    },
  },

  components: {
  },
  computed: {

    itemsTabData () {
      return this.$store.getters["GetItem"]
    },

    rows() {

      return this.itemsTabData.length
    }
  },

  mounted() {
    this.$store.dispatch("Item");
  }

}






</script>
