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
          head-variant="light"
          small
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
          v-if="rowsLength"
          :link-gen="linkGen"
          :number-of-pages="(rowsLength/perPage)+1"
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
    currentPage: {
      type: String,
      default: '0',
    },
    filter: {
      type: String,

    }

  },

  data() {
    return {
      selected: [],

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

  },

  computed: {
    rowsLength() {
      //console.log('lenght', this.dataTable.length)
      //let count = this.$store.getters["BaseComponents/getDataLimitTable"](this.id)
      return Object.keys(this.dataTable).length
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

  mounted() {

  },


}
</script>

<style scoped>

</style>