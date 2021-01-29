<template>
  <b-container fluid >
    <b-row v-if="!initFailed">
<!--        <b-col>-->


      <b-col>
        <b-card
            header-tag="header"
            class="shadow w-100"
        >
          <template #header>
            <h4><small class="text-muted">Заказы</small></h4>
          </template>

          <b-card-text>
            <table-dynamic
                v-if="ordersList"
                :table-id="identifierComponents.tables.ordersList"
                :fields="fields"
                :items="ordersList.data"
                :items-count="ordersList.meta !== undefined ? parseInt(ordersList.meta.count) : 0"
                :items-on-page="20"

            >
              <!--               <router-link :to="'/products/list/edit?id='+data.item.id"  class="mb-0 title-block__text-limit" >{{ data.value }} </router-link>-->
              <template v-slot:cell(id)="data">
                <router-link :to="'/crm/orders/edit/'+data.value">
                  {{ data.value }}
                </router-link>
              </template>

              <template v-slot:cell(user.name)="data">
                <router-link :to="'/crm/orders'">
                  {{ data.value.firstname + ' ' + data.value.lastname }}
                </router-link>
              </template>

              <template v-slot:cell(price)="data">
                <span class="text-nowrap">{{ data.value + ' руб.' }}</span>
              </template>

              <template v-slot:cell(address)="data">
                <span class="">{{
                    data.value.city ? 'г. ' + data.value.city : null
                  }} <br> {{ data.value.detailed ? 'Адрес: ' + data.value.detailed : null }}</span>
              </template>

            </table-dynamic>
          </b-card-text>
        </b-card>
      </b-col>




<!--        </b-col>-->
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
        { key: 'status.name', label: 'Статус'  ,  thStyle: {  width: '100px' }},
        { key: 'offersCount', label: 'Заказов'  ,  thStyle: {  width: '50px' }},
        { key: 'price', sortable: true , label: 'Сумма' , thStyle: {  width: '100px' }},
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

  watch: {
    $route() {
       this.$store.dispatch('CrmOrders/getDataAllItems', this.$route.query)
      window.scrollTo(0,0)
    }
  },

}
</script>

<style scoped>

</style>