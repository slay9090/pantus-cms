<!--Переделать на апдейт, филтер получить дату 2 раза аотрабатывает-->

<template>
<!--  :id="id"-->
<!--  ref="selectableTable"-->
<!--  selectable-->
<!--  select-mode="single"-->
<!--  selected-variant="warning"-->
<!--  @row-selected="onRowSelected"-->
<!--  :items="dataTable"-->
<!--  :fields="fields"-->
<!--  :sort-compare="myCompare"-->
<!--  sort-icon-left-->
<!--  responsive="sm"-->
<!--  :per-page="perPage"-->
<!--  :current-page="currentPage"-->
<!--  :filter="filter"-->
<!--  @filtered="setFilteredDataTable"-->
<!--  head-variant="light"-->
<!--  small-->
<!--  :sort-by.sync="sortBy"-->
<!--  :sort-desc.sync="sortDesc"-->
  <b-overlay :show="isLoad" no-fade rounded="sm" class="w-100">
    <div class="" v-if="dataTable">
      <b-table
          v-bind="$attrs"
          :id="id"
          :items="dataTable"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          @filtered="setFilteredDataTable"
          @row-selected="onRowSelected"
      >

        <!--        Принимаем все слоты -->
        <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
          <slot :name="slotName" v-bind="slotScope"></slot>
        </template>

        <template v-slot:cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span aria-hidden="true">&check;</span>
          </template>
          <template v-else>
            <span aria-hidden="true">&nbsp;</span>
          </template>
        </template>

      </b-table>

      <b-pagination-nav
          v-if="countDataRows"
          :link-gen="linkGen"
          :number-of-pages="(countDataRows/perPage)+1"
          use-router
          v-model="currentPage"
      ></b-pagination-nav>

    </div>
  </b-overlay>

</template>

<script>
export default {

  name: "limit-data-table",

  props: {
    id: {
      type: String,
      required: true,
    },
    items: {

    },
    fields: {
      type: Array,
      required: true,
    },
    isLoad: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: Number,
      default: 10,
    },



  },

  data() {
    return {
      selected: [],
      currentPage: this.$route.query.page ? this.$route.query.page : 1,
      filteredDataTable: null,
      sortBy: this.sortByField,
      sortDesc: this.sortDescMode,
      debugStartTime: null,
    }
  },

  methods: {
    //выбраная строка в таблице
    onRowSelected(items) {
      console.log(items)
      this.$emit('input', items);
    },
    //генерация урл для пагинации
    // linkGen(pageNum) {
    //   return pageNum === 1 ? '?' : `?page=${pageNum}`
    // },

    linkGen(pageNum) {
      // генерация ссылок Page
      let page;
      pageNum === 1 ? page = undefined : page = pageNum
      return {
        query: {
          ...this.$route.query,
          page: page,
        },
      };
    },
    //сортировка по дате
    myCompare(itemA, itemB, key) {
      if (key !== 'dates.updated') {
        // If field is not `date` we let b-table handle the sorting
        return false
      } else {
        // Convert the string formatted date to a number that can be compared
        // Get the values being compared from the items
        let a = itemA['dates']['updated']
        let b = itemB['dates']['updated']
        // Split them into an array of parts (dd, mm, and yyyy)
        // console.log(itemA['dates']['updated'])
        // console.log(a, " ", b)
        a = a.split(' ')
        b = b.split(' ')

        // console.log(a[0], " ", b[0])
        a = a[0].split('.')
        b = b[0].split('.')
        // console.log(a, " ", b)
        //
        // // convert string parts to numbers
        a = (parseInt(a[2], 10) * 10000) + (parseInt(a[1], 10) * 100) + parseInt(a[0])
        b = (parseInt(b[2], 10) * 10000) + (parseInt(b[1], 10) * 100) + parseInt(b[0])
        // Return the comparison result
        return a - b
      }

    },
    // получаем строки после фильтра
    setFilteredDataTable(row) {
      this.filteredDataTable = row;
    },

  },

  computed: {
    //размер всей таблицы
    dataTableLength() {
      return Object.keys(this.dataTable).length
    },
    //размер таблицы после фильтра
    filteredDataTableLength() {
      return Object.keys(this.filteredDataTable).length
    },
    // вычисляем размер таблицы для пагинации
    countDataRows() {
      if (this.filteredDataTable) {
        return this.filteredDataTableLength
      }
      return this.dataTableLength
    },

    dataTable() {
      return this.$store.getters["BaseComponents/getDataTable"](this.id)
    },

  },

  watch: {
    /// При поиске кидать на 1ю пагинацию
    filteredDataTable() {
      this.currentPage = '1';
      if (this.$route.query.page) {
      this.$router.push({
        path: this.$route.path, query: {
          ...this.$route.query,
          page: undefined,
        },
      })
    }
    },

    items() {
      console.log('change items table')
      this.$store.commit('BaseComponents/setDataTable', {
        'key': this.id,
        'value': this.items
      });
    },

    $route() {
      this.$route.query.page ?  null : this.currentPage = 1;
    }


  },


}
</script>

<style scoped>

</style>