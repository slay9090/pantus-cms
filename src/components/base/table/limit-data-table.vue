<!--Переделать на апдейт, филтер получить дату 2 раза аотрабатывает-->

<template>

  <b-overlay :show="!dataTable" no-fade rounded="sm">

    <div class="" v-if="dataTable">
      <b-table
          :id="id"
          ref="selectableTable"
          selectable
          select-mode="single"
          selected-variant="warning"
          @row-selected="onRowSelected"
          :items="dataTable"
          :fields="fields"
          :sort-compare="myCompare"
          sort-icon-left
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          @filtered="setFilteredDataTable"

          head-variant="light"
          small

          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"


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
    fields: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    urlPageValue: {
      type: String,
      default: '1',
    },
    filter: {
      type: String,
    },

    sortByField: {
      type: String,
      default: null
    },
    sortDescMode: {
      type: Boolean,
      default: false,
    },

  },

  data() {
    return {
      selected: [],
      currentPage: this.urlPageValue,
      filteredDataTable: null,
      sortBy: this.sortByField,
      sortDesc: this.sortDescMode,


    }
  },

  methods: {
    onRowSelected(items) {
      this.selected = items
    },

    //генерация урл для пагинации
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
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

    setFilteredDataTable(row) {
      this.filteredDataTable = row;
    },

  },

  computed: {
    dataTableLength() {
      return Object.keys(this.dataTable).length
    },

    filteredDataTableLength() {
      return Object.keys(this.filteredDataTable).length
    },

    countDataRows() {
      if (this.filteredDataTable) {
        return this.filteredDataTableLength
      }
      return this.dataTableLength
    },


    dataTable: {
      get() {
        console.log(this.$store.getters["BaseComponents/getDataLimitTable"](this.id))
        return this.$store.getters["BaseComponents/getDataLimitTable"](this.id)
      },
      set(val) {
        this.$store.commit('BaseComponents/setDataLimitTable', {'key': this.id, 'value': val})
      },

    }

  },
  updated() {
  },
  mounted() {
  },

  watch: {
    filteredDataTable() {
      this.currentPage = '1';
    }
  },


}
</script>

<style scoped>

</style>