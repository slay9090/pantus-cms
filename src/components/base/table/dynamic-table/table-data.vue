<template>
  <b-table

      ref="selectableTable"
      selectable
      select-mode="single"
      selected-variant="warning"
      @row-selected="onRowSelected"
      :id="tableId"
      :items="dataTable"
      :fields="fields"
      sort-icon-left
      responsive="sm"
      :filter="filter"
      head-variant="light"
      small
  >
<!--    slots-->
    <!--        Принимаем все слоты -->
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
      <slot :name="slotName" v-bind="slotScope"></slot>
    </template>
<!--    галочка выделенная строка-->
    <template v-slot:cell(selected)="{ rowSelected }">
      <template v-if="rowSelected">
        <span aria-hidden="true">&check;</span>
      </template>
      <template v-else>
        <span aria-hidden="true">&nbsp;</span>
      </template>
    </template>

  </b-table>
</template>

<script>
export default {
name: "table-data",
  props: {
    tableId: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },


  },
  data(){
  return {


    sortBy: 'id',
    sortDesc: false,
    filter: null,
    selected: [],
  }
  },
  computed: {
    dataTable() {
      return this.$store.getters["BaseComponents/getDataTable"](this.tableId)
    },
  },

  methods: {
    ///записать данные выбраной строки в таблице
    onRowSelected(items) {
      this.selected = items
    },
  },
}
</script>

<style scoped>

</style>