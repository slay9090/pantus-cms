<template>
  <b-container>
    <b-row v-if="!initFailed">
        <b-col>


            <table-dynamic
                v-if="ordersList"
                :table-id="identifierComponents.tables.ordersList"
                :fields="fields"
                :items="ordersList.data"
                :items-count="ordersList.meta !== undefined ? parseInt(ordersList.meta.count) : 0"
                :items-on-page="20"

            >
                <template v-slot:cell(user.name)="data">
                  <router-link :to="'/news/articles/edit?id='+data.item.id" >{{ data.value.firstname +' '+ data.value.lastname }}</router-link>
                </template>

            </table-dynamic>




        </b-col>
    </b-row>

  </b-container>
</template>

<script>
import init from './init';

export default {
  name: "index",
  mixins: [init,],

  data(){
    return{
      identifierComponents: {
        input: {

        },
        tables: {
          ordersList: 'crm-orders-list-table',
        }
      },

      fields: [
        { key: 'selected', label:  '✓',  thStyle: {  width: '30px' }},
        { key: 'id',  sortable: true , label: 'Id',  thStyle: {  width: '80px' } },
        { key: 'user.name', sortable: true , label: 'Пользователь',  thStyle: {  width: '200px' }},
        { key: 'address', label: 'Адрес'  ,  thStyle: {  width: '100px' }},
        { key: 'offersCount', label: 'Заказов'  ,  thStyle: {  width: '100px' }},
        { key: 'status.name', label: 'Статус'  ,  thStyle: {  width: '100px' }},
        { key: 'price', sortable: true , label: 'Цена' , thStyle: {  width: '100px' }},
        { key: 'date', sortable: true , label: 'Дата' , thStyle: {  width: '100px' }},
      ],
    }
  },

  computed: {
    ordersList(){
      return this.$store.getters["CrmOrders/allItems"];
    }
  },

  mounted() {
    this.dataInit();
  },

}
</script>

<style scoped>

</style>