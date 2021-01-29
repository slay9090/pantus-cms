<template>
  <b-overlay :show="isLoading" no-fade rounded="sm">

    <table-dynamic
        v-bind="{ tableId: tableId, fields: fields, }"
    >
      <!--      пробрасываем все слоты-->
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope"></slot>
      </template>

    </table-dynamic>
<!---->
    <table-paginations
        v-if="this.items"
        v-bind="{ itemsCount: itemsCount, itemsOnPage: itemsOnPage,}"
    />
  </b-overlay>
</template>

<script>
import tableDynamic from './table-data'
import tablePaginations from './table-paginations'

export default {
  name: "index",
  components: {tableDynamic, tablePaginations},
  props: {
    tableId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
    },
    itemsCount: {
      type: Number,
      required: true,
    },

    itemsOnPage: {
      type: Number,
      default: 20,
    },

    fields: {
      type: Array,
      required: true,
    },


  },

  data() {
    return {
      isLoading: true,
    }
  },

  watch: {
    items() {
      // this.isLoading = true

      console.log('change items table')
      this.$store.commit('BaseComponents/setDataTable', {

        'key': this.tableId,
        'value': this.items
      });
      this.isLoading = false
    },

      $route() {
        console.log('route')

        this.isLoading = true
      }

  },
  mounted() {
    this.isLoading = false
    //
  }


}
</script>

<style scoped>

</style>